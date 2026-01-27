# Component Variants Catalog

Complete reference for all component variants available in the BrainSpark design system.

## Button Variants

**File:** `src/components/ui/button.tsx`

### Standard Variants

```tsx
import { Button } from '@/components/ui/button';

// Default - Primary filled button
<Button variant="default">Default</Button>

// Destructive - Error/delete actions
<Button variant="destructive">Delete</Button>

// Outline - Border only
<Button variant="outline">Outline</Button>

// Secondary - Subtle background
<Button variant="secondary">Secondary</Button>

// Ghost - No background until hover
<Button variant="ghost">Ghost</Button>

// Link - Text link style
<Button variant="link">Link</Button>
```

### Japanese Theme Variants

```tsx
// Ink - Deep blue/black traditional ink
<Button variant="ink">Ink Style</Button>

// Sakura - Cherry blossom pink
<Button variant="sakura">Sakura</Button>

// Bamboo - Green nature accent
<Button variant="bamboo">Bamboo</Button>

// Seal - Traditional red seal stamp
<Button variant="seal">Seal Red</Button>
```

### Material Design Variants

```tsx
// Filled - Solid primary color
<Button variant="filled">Filled</Button>

// Tonal - Subtle primary background
<Button variant="tonal">Tonal</Button>

// Elevated - With shadow elevation
<Button variant="elevated">Elevated</Button>
```

### Size Options

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

### Button with Icon

```tsx
import { Plus, Sparkles, Loader2 } from 'lucide-react';

<Button className="gap-2">
  <Plus className="w-4 h-4" />
  Add New
</Button>

<Button variant="sakura" className="gap-2">
  <Sparkles className="w-4 h-4" />
  AI Suggest
</Button>

// Loading state
<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  Loading...
</Button>
```

---

## Card Variants

**File:** `src/components/ui/card.tsx`

### Available Variants

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Default - Standard card with border
<Card variant="default">
  <CardContent>Default card</CardContent>
</Card>

// Elevated - Raised with shadow
<Card variant="elevated">
  <CardContent>Elevated card with shadow</CardContent>
</Card>

// Outlined - Border emphasis
<Card variant="outlined">
  <CardContent>Outlined card</CardContent>
</Card>

// Flat - Minimal, no border or shadow
<Card variant="flat">
  <CardContent>Flat minimal card</CardContent>
</Card>

// Interactive - Hover effects for clickable cards
<Card variant="interactive">
  <CardContent>Interactive card</CardContent>
</Card>
```

### Card Structure

```tsx
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Main content */}
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="ghost">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Paper Card Effect

```tsx
// Traditional paper texture styling
<Card className="paper-card">
  <CardContent>
    Content with paper texture effect
  </CardContent>
</Card>
```

---

## Badge Variants

**File:** `src/components/ui/badge.tsx`

### Standard Variants

```tsx
import { Badge } from '@/components/ui/badge';

// Default - Primary color
<Badge variant="default">Default</Badge>

// Secondary - Muted style
<Badge variant="secondary">Secondary</Badge>

// Destructive - Error/warning
<Badge variant="destructive">Destructive</Badge>

// Outline - Border only
<Badge variant="outline">Outline</Badge>
```

### Status Variants

```tsx
// Success - Green for positive states
<Badge variant="success">Completed</Badge>

// Warning - Yellow for caution
<Badge variant="warning">Pending</Badge>

// Info - Blue for information
<Badge variant="info">New</Badge>

// Muted - Gray for inactive
<Badge variant="muted">Archived</Badge>
```

### Usage Examples

```tsx
// With icon
<Badge variant="success" className="gap-1">
  <Check className="w-3 h-3" />
  Verified
</Badge>

// Count badge
<Badge variant="destructive" className="px-1.5 min-w-[20px]">
  9+
</Badge>

// Status indicator
<Badge variant="info">
  <span className="w-2 h-2 rounded-full bg-current mr-1.5" />
  Active
</Badge>
```

---

## Input Variants

**File:** `src/components/ui/input.tsx`

### Variant Options

```tsx
import { Input } from '@/components/ui/input';

// Default - Standard input with border
<Input variant="default" placeholder="Default input" />

// Filled - Background fill style
<Input variant="filled" placeholder="Filled input" />

// Ghost - Minimal, border on focus only
<Input variant="ghost" placeholder="Ghost input" />
```

### Size Options

```tsx
<Input inputSize="sm" placeholder="Small" />
<Input inputSize="default" placeholder="Default" />
<Input inputSize="lg" placeholder="Large" />
```

### With Label and Validation

```tsx
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email"
    type="email"
    variant="filled"
    placeholder="you@example.com"
  />
  <p className="text-xs text-muted-foreground">
    We'll never share your email.
  </p>
</div>
```

### Paper Input Style

```tsx
<Input className="paper-input" placeholder="Paper texture input" />
```

---

## Textarea Variants

**File:** `src/components/ui/textarea.tsx`

### Available Variants

```tsx
import { Textarea } from '@/components/ui/textarea';

// Default
<Textarea variant="default" placeholder="Default textarea" />

// Filled
<Textarea variant="filled" placeholder="Filled textarea" />

// Ghost
<Textarea variant="ghost" placeholder="Ghost textarea" />
```

### Size Options

```tsx
<Textarea textareaSize="sm" placeholder="Small" />
<Textarea textareaSize="default" placeholder="Default" />
<Textarea textareaSize="lg" placeholder="Large" />
```

---

## Dialog/Modal Patterns

**File:** `src/components/ui/dialog.tsx`

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Optional description text here.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Tabs Component

**File:** `src/components/ui/tabs.tsx`

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Tab 1 content
  </TabsContent>
  <TabsContent value="tab2">
    Tab 2 content
  </TabsContent>
  <TabsContent value="tab3">
    Tab 3 content
  </TabsContent>
</Tabs>
```

---

## Tooltip Component

**File:** `src/components/ui/tooltip.tsx`

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="w-4 h-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Avatar Component

**File:** `src/components/ui/avatar.tsx`

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Sizes
<Avatar className="w-8 h-8">...</Avatar>  // Small
<Avatar className="w-10 h-10">...</Avatar> // Default
<Avatar className="w-12 h-12">...</Avatar> // Large
<Avatar className="w-16 h-16">...</Avatar> // XL
```

---

## Skeleton Loading

**File:** `src/components/ui/skeleton.tsx`

```tsx
import { Skeleton } from '@/components/ui/skeleton';

// Text line
<Skeleton className="h-4 w-[200px]" />

// Avatar
<Skeleton className="w-10 h-10 rounded-full" />

// Card placeholder
<div className="space-y-3">
  <Skeleton className="h-32 w-full rounded-lg" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

---

## Switch Component

**File:** `src/components/ui/switch.tsx`

```tsx
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

## Select Component

**File:** `src/components/ui/select.tsx`

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

---

## Complete Component Import

```tsx
// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from '@/components/ui/tooltip';
```

---

## Best Practices

### 1. Use Semantic Variants

```tsx
// ✅ Correct - semantic variant
<Badge variant="success">Completed</Badge>
<Button variant="destructive">Delete</Button>

// ❌ Avoid - custom colors
<Badge className="bg-green-500">Completed</Badge>
```

### 2. Consistent Sizing

```tsx
// ✅ Correct - use size props
<Button size="sm">Small</Button>
<Input inputSize="lg" />

// ❌ Avoid - arbitrary sizing
<Button className="py-1 px-2 text-xs">Small</Button>
```

### 3. Combine with Motion

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <Card variant="elevated">
    {/* content */}
  </Card>
</motion.div>
```

---

**Last Updated:** January 2025
