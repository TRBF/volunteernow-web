# Components

## Dot Component

The `Dot` component creates a customizable dot pattern background using CSS radial gradients.

### Props

- `color?: string` - Color of the dots (default: "#cacaca")
- `size?: number` - Size of dots in pixels (default: 1)
- `spacing?: number` - Spacing between dots (default: 10)
- `children?: React.ReactNode` - Content to display over the dot pattern
- `className?: string` - CSS class name
- `style?: React.CSSProperties` - Inline styles

### Usage

```tsx
import Dot from './components/Dot';

// Basic usage
<Dot>
  <div>Content with dot background</div>
</Dot>

// Customized dot pattern
<Dot
  color="#7211a2"
  size={2}
  spacing={20}
  style={{ height: '200px', borderRadius: '8px' }}
>
  <div>Custom purple dots</div>
</Dot>
```

### Integration

The dot pattern has been integrated into:

1. **BackgroundPattern component** - Used for the main app background
2. **Theme body background** - Applied to the entire app body
3. **Demo page** - Available at `/demo` to showcase different configurations

### Examples

- Default: Small gray dots with 10px spacing
- Purple theme: `#7211a2` color with various sizes and spacing
- Light overlay: `rgba(114, 17, 162, 0.1)` for subtle patterns 