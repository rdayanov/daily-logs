# Daily Logs

## Features:
### 1. Write logs
Daily logs with live markdown editing support

### 2. Track your mental state with weekly tests
- Mindfulness / therapy progress tracker
- BDI
- HADS

### 3. Logs templates
Customize your logs to track aspects of your life important to you

### 4. Review activity
Heatmap representing different measurable questions answers

### 5. Analytics
Send data to AI to align tests results with logs

## Implementation:
### .md support

#### CodeMirror with lang-markdown
[CodeMirror](https://github.com/codemirror/dev/)
[@codemirror/lang-markdown](https://github.com/codemirror/lang-markdown)

### UI Framework
|                 | Svelte-Kit                                          | Remix                                          |
|-----------------|-----------------------------------------------------|------------------------------------------------|
| **SSR**         | true                                                | true                                           |
| **PWA**         | native + popular tool                               | ecosystem only                                 |
| **Lightweight** | true                                                | false                                          |
| **Engine**      | express by default, customizable by defining server | express by default, customizable with adapters |

### Where to store data?
1. bootstrap a server with db
2. Backend-as-a-Service (BaaS)
