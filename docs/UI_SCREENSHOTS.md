# Brain Spark - UI Screenshots & User Flows

## 📸 Application Screenshots

### Authentication & Onboarding

#### 1. Welcome/Onboarding Screen
![Onboarding](../screenshots/onboarding.png)
- **Route:** `/auth`, `/`, `/knowledge`, `/search`, etc. (First-time users)
- **Purpose:** Introduces users to Brain Spark with a 4-step onboarding flow
- **Key Features:**
  - Welcome message and app introduction
  - Feature highlights
  - Progressive indicator (1 of 4)
  - Skip/Next navigation
  - Clean, centered modal design

#### 2. Authentication Page
![Auth Page](../screenshots/auth.png)
- **Route:** `/auth`
- **Purpose:** User sign-in and sign-up
- **Key Features:**
  - Tab-based interface (Sign In / Sign Up)
  - Email and password fields
  - Full name field (sign-up only)
  - Form validation with Zod
  - Loading states
  - Error handling with toast notifications
  - Gradient background (bg-gradient-paper)

---

### Main Application Screens

#### 3. Home/Knowledge Hub
![Home Page](../screenshots/home.png)
- **Route:** `/`
- **Purpose:** Main dashboard and knowledge hub entry point
- **Key Features:**
  - Welcome screen component
  - Quick stats display
  - Feature categories grid
  - Platform integration options
  - Quick action buttons (Search, Add Content)
  - Bottom navigation

#### 4. Add Content Page
![Add Content](../screenshots/add.png)
- **Route:** `/add`
- **Purpose:** Universal content capture interface
- **Key Features:**
  - Multiple content type support (URL, YouTube, PDF, Note)
  - Tab-based content type selection
  - Form fields for metadata (title, tags, collection)
  - Rich text editor for notes
  - File upload interface
  - Collection assignment
  - Gradient background

#### 5. Knowledge Hub
![Knowledge Hub](../screenshots/knowledge.png)
- **Route:** `/knowledge`
- **Purpose:** Advanced knowledge management features
- **Key Features:**
  - Smart collections view
  - Enhanced search interface
  - Knowledge graph visualization
  - Learning analytics dashboard
  - Smart actionables
  - AI chat interface
  - Gamification elements

#### 6. Search Page
![Search](../screenshots/search.png)
- **Route:** `/search`
- **Purpose:** Search and filter bookmarks
- **Key Features:**
  - Advanced search with filters
  - Semantic search capabilities
  - Results grid/list view
  - Filter by tags, collections, date
  - Sort options
  - Search history

---

### Twitter-Style Features

#### 7. Twitter Home Feed
![Twitter Feed](../screenshots/twitter-home.png)
- **Route:** `/twitter`
- **Purpose:** Twitter-like social feed for knowledge sharing
- **Key Features:**
  - Tweet-style bookmark cards
  - Infinite scroll
  - Like, comment, share interactions
  - Floating action button (compose)
  - Timeline view

#### 8. Tweet Composer
![Tweet Compose](../screenshots/twitter-compose.png)
- **Route:** `/twitter/compose`
- **Purpose:** Create new content in tweet format
- **Key Features:**
  - Rich text composer
  - Character counter
  - Media attachment
  - URL preview
  - Draft saving
  - Post button with validation

---

## 🔄 User Flow Diagrams

### Primary User Flows

<lov-mermaid>
graph TD
    A[Landing Page] --> B{User Authenticated?}
    B -->|No| C[Onboarding Flow]
    C --> D[Sign Up/Sign In]
    D --> E[Home Dashboard]
    B -->|Yes| E
    
    E --> F[Add Content]
    E --> G[Search Knowledge]
    E --> H[Knowledge Hub]
    E --> I[Twitter Feed]
    
    F --> F1[Capture URL]
    F --> F2[Add YouTube]
    F --> F3[Upload PDF]
    F --> F4[Create Note]
    
    G --> G1[Basic Search]
    G --> G2[Advanced Filters]
    G --> G3[Semantic Search]
    
    H --> H1[Collections]
    H --> H2[Analytics]
    H --> H3[Knowledge Graph]
    H --> H4[Smart Discovery]
    
    I --> I1[View Feed]
    I --> I2[Compose Tweet]
    I --> I3[View Thread]
    
    style E fill:#4f46e5
    style F fill:#10b981
    style G fill:#f59e0b
    style H fill:#8b5cf6
    style I fill:#06b6d4
</lov-mermaid>

### Authentication Flow

<lov-mermaid>
sequenceDiagram
    participant U as User
    participant UI as UI Layer
    participant Auth as Auth Hook
    participant SB as Supabase
    participant DB as Database
    
    U->>UI: Navigate to App
    UI->>Auth: Check Session
    Auth->>SB: Get Current User
    
    alt Not Authenticated
        SB-->>UI: No Session
        UI->>U: Show Onboarding
        U->>UI: Complete Onboarding
        UI->>U: Show Sign Up/Sign In
        U->>UI: Enter Credentials
        UI->>Auth: Sign Up/Sign In
        Auth->>SB: Create Session
        SB->>DB: Store User Profile
        DB-->>SB: Success
        SB-->>Auth: Session Token
        Auth-->>UI: User Object
        UI->>U: Redirect to Home
    else Authenticated
        SB-->>UI: Valid Session
        UI->>U: Show Home
    end
</lov-mermaid>

### Content Capture Flow

<lov-mermaid>
graph LR
    A[Click Add Content] --> B{Content Type?}
    
    B -->|URL| C[Enter URL]
    C --> D[Fetch Metadata]
    D --> E[Fill Form]
    
    B -->|YouTube| F[Enter YouTube URL]
    F --> G[Extract Video Info]
    G --> E
    
    B -->|PDF| H[Upload File]
    H --> I[Process PDF]
    I --> E
    
    B -->|Note| J[Create Note]
    J --> E
    
    E --> K[Add Tags]
    K --> L[Select Collection]
    L --> M[Save to Database]
    M --> N[Show Success]
    N --> O[Return to Home]
    
    style M fill:#10b981
</lov-mermaid>

### Search & Discovery Flow

<lov-mermaid>
graph TD
    A[Search Page] --> B[Enter Query]
    B --> C{Search Type?}
    
    C -->|Basic| D[Text Search]
    C -->|Semantic| E[AI-Powered Search]
    C -->|Advanced| F[Multi-Filter Search]
    
    D --> G[Query Database]
    E --> H[Generate Embeddings]
    F --> I[Build Complex Query]
    
    H --> G
    I --> G
    
    G --> J[Return Results]
    J --> K[Display Cards]
    K --> L{User Action}
    
    L -->|View| M[Open Detail]
    L -->|Edit| N[Edit Bookmark]
    L -->|Delete| O[Confirm Delete]
    L -->|Filter| P[Apply Filters]
    
    P --> G
    
    style E fill:#8b5cf6
    style J fill:#10b981
</lov-mermaid>

### Knowledge Hub Navigation Flow

<lov-mermaid>
graph TD
    A[Knowledge Hub] --> B[Collections View]
    A --> C[Analytics Dashboard]
    A --> D[Knowledge Graph]
    A --> E[Smart Discovery]
    A --> F[AI Chat]
    
    B --> B1[View Collection]
    B1 --> B2[Filter Bookmarks]
    B2 --> B3[Edit Collection]
    
    C --> C1[Daily Activity]
    C --> C2[Learning Streaks]
    C --> C3[Progress Charts]
    
    D --> D1[3D Visualization]
    D1 --> D2[Node Interactions]
    D2 --> D3[Explore Connections]
    
    E --> E1[Recommendations]
    E1 --> E2[Similar Content]
    E2 --> E3[Trending Topics]
    
    F --> F1[Ask Question]
    F1 --> F2[AI Response]
    F2 --> F3[Suggested Actions]
    
    style A fill:#4f46e5
    style D1 fill:#8b5cf6
    style F2 fill:#10b981
</lov-mermaid>

---

## 🎨 Design System Overview

### Color Tokens
- **Primary:** HSL-based ink color (Japanese calligraphy inspired)
- **Secondary:** Washi paper textures
- **Accent:** Soft pastels (origami-inspired)
- **Background:** Gradient paper effects
- **Text:** High contrast for readability

### Component Patterns
- **Cards:** Elevated with subtle shadows
- **Buttons:** Multiple variants (default, outline, ghost, premium)
- **Forms:** Validated with inline error messages
- **Navigation:** Bottom navigation for mobile-first
- **Modals:** Centered with backdrop blur
- **Toasts:** Sonner for notifications

### Responsive Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 📱 Mobile-First Design

All screens are designed mobile-first with:
- Touch-friendly tap targets (minimum 44px)
- Swipe gestures for navigation
- Bottom navigation for easy thumb access
- Responsive grid layouts
- Optimized images with lazy loading

---

## 🔒 Authentication States

### Unauthenticated
- Shows onboarding flow
- Redirects to `/auth` for sign-in
- Limited access to public pages

### Authenticated
- Full app access
- Persistent session
- User profile data loaded
- Personalized content

---

## 🚀 Performance Optimizations

- **Lazy Loading:** Routes and images
- **Code Splitting:** Dynamic imports
- **Caching:** React Query for data
- **Optimistic Updates:** Immediate UI feedback
- **Debounced Search:** Reduces API calls
- **Virtual Scrolling:** For long lists

---

## 📊 Analytics Tracking

User interactions tracked:
- Page views
- Content captures
- Search queries
- Collection actions
- Learning streaks
- Daily activities

---

## 🎯 Key User Journeys

### 1. New User Onboarding
1. Land on homepage
2. See onboarding modal
3. Complete 4-step tour
4. Sign up for account
5. Confirm email
6. First content capture
7. Create first collection

### 2. Daily Knowledge Worker
1. Sign in
2. Check daily stats
3. Review smart actionables
4. Add new content
5. Search existing knowledge
6. Update collections
7. Review analytics

### 3. Content Curator
1. Capture web articles
2. Add YouTube videos
3. Upload PDFs
4. Tag and organize
5. Build collections
6. Share with team
7. Export data

---

## 🔗 Navigation Structure

```
/                      → Home/Knowledge Hub
├── /auth             → Authentication
├── /add              → Add Content
├── /knowledge        → Knowledge Hub Features
├── /search           → Search Page
├── /review           → Review Page
├── /document         → Document View
├── /settings         → User Settings
└── /twitter          → Twitter-Style Feed
    ├── /compose      → Create Tweet
    ├── /explore      → Explore
    ├── /messages     → Messages
    ├── /notifications → Notifications
    ├── /profile      → User Profile
    └── /search       → Twitter Search
```

---

## 📝 Notes for Cursor Development

### Authentication Required Pages
Most pages require authentication. The screenshot tool shows the onboarding flow because it cannot access authenticated pages. In actual use:
- Users see the onboarding only once
- After sign-in, they access the full app
- Session persists across visits

### Dynamic Content
Screenshots show the initial state. Actual pages contain:
- User-specific bookmarks
- Personalized recommendations
- Real-time analytics
- Live search results
- Interactive visualizations

### Backend Integration
All pages connect to Supabase for:
- User authentication
- CRUD operations
- Real-time updates
- File storage
- Edge functions

Refer to `CURSOR_BACKEND_SETUP.md` for complete backend integration details.
