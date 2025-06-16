import { DragEvent } from 'react'

export const FIELD_DRAG_EVENT = 'text/daily-logs-drag'

export const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
  ev.dataTransfer.setData('text/html', ev.currentTarget.innerHTML)
  ev.dataTransfer.setData(FIELD_DRAG_EVENT, 'true')
  ev.dataTransfer.effectAllowed = 'move'
}

export const onDragEnd = (ev: DragEvent<HTMLDivElement>) => {
  if (ev.dataTransfer.dropEffect === 'move') {
    const elToRemove = ev.currentTarget.parentElement
    elToRemove?.remove()
  }
}

export const onDragEnter = (ev: DragEvent<HTMLDivElement>) => {
  if (ev.dataTransfer.types.includes(FIELD_DRAG_EVENT)) {
    ev.preventDefault()
  }
}

export const onDragOver = (ev: DragEvent<HTMLDivElement>) => {
  if (ev.dataTransfer.types.includes(FIELD_DRAG_EVENT)) {
    ev.dataTransfer.dropEffect = 'move'
    ev.preventDefault()
  }
}

export const onDrop = (ev: DragEvent<HTMLDivElement>) => {
  const newEl = document.createElement('div')
  newEl.innerHTML = ev.dataTransfer.getData('text/html')
  const insertBefore = ev.currentTarget.parentElement
  insertBefore?.parentElement?.insertBefore(newEl, insertBefore)
}

export default {
  onDragStart,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDrop,
}
