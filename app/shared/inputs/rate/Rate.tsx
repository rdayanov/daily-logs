import { FocusEvent, KeyboardEvent, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'

import styles from './styles.module.pcss'

interface RateProps {
  initialValue?: number;
  name: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
  max?: number;
  required?: boolean;
  children?: ReactNode;
  hideLabel?: boolean;
}

export const Rate = ({
                       initialValue = 0,
                       name,
                       onChange,
                       disabled = false,
                       max = 3,
                       required = false,
                       children,
                       hideLabel,
                     }: RateProps) => {
  const controlId = `rate-${ name }`

  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    onChange && onChange(value)
  }, [onChange, value])

  const [hover, setHover] = useState(-1)
  const [focused, setFocused] = useState(-1)
  const ratingRefs = useRef<HTMLInputElement[]>([])

  const [parentTabIndex, setParentTabIndex] = useState(0)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const onClick = (value: number) => {
    if (!disabled) {
      setValue(value)
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (disabled) return

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp': {
        e.preventDefault()
        const nextIndex = Math.min(index + 1, max - 1)
        focusEl(nextIndex)
        break
      }

      case 'ArrowLeft':
      case 'ArrowDown': {
        e.preventDefault()
        const prevIndex = Math.max(index - 1, 0)
        focusEl(prevIndex)
        break
      }

      case 'Home':
        e.preventDefault()
        focusEl(0)
        break
      case 'End':
        e.preventDefault()
        focusEl(max - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        onClick(index + 1)
        break

      default:
        if (/\d/.test(e.key)) {
          e.preventDefault()
          const numRating = parseInt(e.key)
          if (numRating <= max) {
            onClick(numRating)
            focusEl(numRating - 1)
          }
          break
        }

    }
  }

  const onMouseEnter = (rate: number) => {
    if (!disabled) {
      setHover(rate)
    }
  }

  const onFocus = (rate: number) => {
    if (!disabled) {
      setFocused(rate)
    }
  }

  const focusEl = (rate: number) => {
    if (disabled) return

    onFocus(rate)
    ratingRefs.current[rate]?.focus()
  }

  const onParentFocus = (e: FocusEvent<HTMLDivElement>) => {
    const parentEl = parentRef.current
    if (e.target === parentEl) {
      focusEl(0)
      setParentTabIndex(-1)
    }
  }

  const onBlur = () => {
    setFocused(-1)
    setParentTabIndex(0)
  }

  const onMouseLeave = () => setHover(-1)

  const getTabIndex = (index: number) => {
    if (focused === index) {
      return 0
    }

    if (focused === -1 && !index) {
      return 0
    }

    return -1
  }

  const onResetClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onClick(-1)
  }

  return (
    <>
      <div className={ styles.ratingContainer }>
        {/* eslint-disable-next-line jsx-a11y/aria-activedescendant-has-tabindex */ }
        <div className={ styles.ratingInput }
             style={ { '--cols-amount': `${ max + 1 }` } }
             id={ controlId }
             role="radiogroup"
             aria-required={ required }
             onMouseLeave={ onMouseLeave }
             onFocus={ onParentFocus }
             ref={ el => (parentRef.current = el) }
             tabIndex={ parentTabIndex }
             aria-activedescendant={ `${ controlId }-${ focused }` }>
          {
            ([...new Array(max)]).map((_, index) => {
              const isFilled = index < value
              const isFocused = focused >= index || hover > index

              const rateValue = index + 1
              const isSelected = value === rateValue

              return (
                <input key={ index }
                       ref={ el => el && (ratingRefs.current[index] = el) }
                       className={ `${ styles.scale } ${ isFocused ? styles.scaleFocused : isFilled ? styles.scaleFilled : '' }` }
                       type="radio"
                       value={ rateValue }
                       id={ `${ controlId }-rateValue` }
                       checked={ isSelected }
                       name={ `value` }
                       tabIndex={ getTabIndex(index) }
                       aria-checked={ isSelected }
                       aria-label={ `${ rateValue }${ isSelected ? ', selected' : '' }` }
                       aria-disabled={ disabled }
                       disabled={ disabled }
                       onClick={ () => onClick(rateValue) }
                       onChange={ () => onClick(rateValue) }
                       onMouseEnter={ () => onMouseEnter(rateValue) }
                       onKeyDown={ (e) => onKeyDown(e, index) }
                       onFocus={ () => onFocus(index) }
                       onBlur={ onBlur }
                />
              )
            })
          }
          { value > 0 ?
            <button type="reset"
                    className={ `${ styles.reset }` }
                    disabled={ disabled }
                    onClick={ onResetClick }>X
            </button>
            :
            <></>
          }
        </div>
        {
          !hideLabel ?
            <label htmlFor={ controlId }>
              { children || name }
            </label>
            : <></>
        }
      </div>
    </>
  )
}
