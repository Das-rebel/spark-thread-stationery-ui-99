import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { z } from 'zod';
import { Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const authSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).max(100),
  fullName: z.string().trim().min(1, { message: 'Name is required' }).max(100).optional(),
});

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signUp, signIn, resetPassword, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    
    // Check if this is a password reset redirect
    if (searchParams.get('reset') === 'true') {
      setShowResetPassword(true);
    }
  }, [user, navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = authSchema.parse({
        email,
        password,
        fullName: isSignUp ? fullName : undefined,
      });

      if (isSignUp) {
        const { error } = await signUp(validatedData.email, validatedData.password, validatedData.fullName);
        if (error) {
          if (error.message?.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
          } else {
            toast.error(error.message || 'Failed to sign up');
          }
        } else {
          toast.success('Sign up successful! Please check your email to confirm your account.');
        }
      } else {
        const { error } = await signIn(validatedData.email, validatedData.password);
        if (error) {
          if (error.message?.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message || 'Failed to sign in');
          }
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      z.string().email().parse(email);
      const { error } = await resetPassword(email);
      
      if (error) {
        toast.error(error.message || 'Failed to send reset email');
      } else {
        toast.success('Password reset email sent! Check your inbox.');
        setShowForgotPassword(false);
      }
    } catch (error) {
      toast.error('Please enter a valid email address');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      z.string().min(6).parse(newPassword);
      const { error } = await updatePassword(newPassword);
      
      if (error) {
        toast.error(error.message || 'Failed to update password');
      } else {
        toast.success('Password updated successfully!');
        setShowResetPassword(false);
        navigate('/');
      }
    } catch (error) {
      toast.error('Password must be at least 6 characters');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-paper flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Japanese-themed SVG elements */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="sakura-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Sakura blossom petals */}
            <path d="M50,50 Q60,45 65,50 Q60,55 50,50" fill="hsl(var(--sakura))" opacity="0.3" />
            <path d="M50,50 Q55,40 60,45 Q55,50 50,50" fill="hsl(var(--sakura))" opacity="0.3" transform="rotate(72 50 50)" />
            <path d="M50,50 Q55,40 60,45 Q55,50 50,50" fill="hsl(var(--sakura))" opacity="0.3" transform="rotate(144 50 50)" />
            <path d="M50,50 Q55,40 60,45 Q55,50 50,50" fill="hsl(var(--sakura))" opacity="0.3" transform="rotate(216 50 50)" />
            <path d="M50,50 Q55,40 60,45 Q55,50 50,50" fill="hsl(var(--sakura))" opacity="0.3" transform="rotate(288 50 50)" />
          </pattern>
          <linearGradient id="bamboo-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--bamboo))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--bamboo))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#sakura-pattern)" />
        
        {/* Bamboo stalks on sides */}
        <g opacity="0.15">
          <rect x="5%" y="0" width="12" height="100%" fill="url(#bamboo-gradient)" rx="6" />
          <line x1="5.5%" y1="15%" x2="5.5%" y2="15.5%" stroke="hsl(var(--bamboo))" strokeWidth="14" />
          <line x1="5.5%" y1="40%" x2="5.5%" y2="40.5%" stroke="hsl(var(--bamboo))" strokeWidth="14" />
          <line x1="5.5%" y1="70%" x2="5.5%" y2="70.5%" stroke="hsl(var(--bamboo))" strokeWidth="14" />
          
          <rect x="93%" y="0" width="12" height="100%" fill="url(#bamboo-gradient)" rx="6" />
          <line x1="93.5%" y1="25%" x2="93.5%" y2="25.5%" stroke="hsl(var(--bamboo))" strokeWidth="14" />
          <line x1="93.5%" y1="55%" x2="93.5%" y2="55.5%" stroke="hsl(var(--bamboo))" strokeWidth="14" />
          <line x1="93.5%" y1="85%" x2="93.5%" y2="85.5%" stroke="hsl(var(--bamboo))" strokeWidth="14" />
        </g>
        
        {/* Floating sakura petals */}
        <g className="animate-float-slow" opacity="0.2">
          <path d="M20,10 Q25,8 28,10 Q25,12 20,10 Z" fill="hsl(var(--sakura))" />
          <path d="M80,30 Q85,28 88,30 Q85,32 80,30 Z" fill="hsl(var(--sakura))" />
          <path d="M15,60 Q20,58 23,60 Q20,62 15,60 Z" fill="hsl(var(--sakura))" />
          <path d="M90,80 Q95,78 98,80 Q95,82 90,80 Z" fill="hsl(var(--sakura))" />
        </g>
      </svg>

      {/* Main auth card */}
      <Card className="w-full max-w-md relative z-10 shadow-paper">
        <AnimatePresence mode="wait">
          {showResetPassword ? (
            <motion.div
              key="reset-password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-sakura flex items-center justify-center shadow-elegant">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="white" opacity="0.9" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-serif">Reset Password</CardTitle>
                <CardDescription>
                  Enter your new password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </motion.div>
          ) : showForgotPassword ? (
            <motion.div
              key="forgot-password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-sakura flex items-center justify-center shadow-elegant">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="white" opacity="0.9" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-serif">Forgot Password?</CardTitle>
                <CardDescription>
                  We'll send you a reset link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowForgotPassword(false)}
                    disabled={loading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign In
                  </Button>
                </form>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="auth-tabs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-sakura flex items-center justify-center shadow-elegant">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="white" opacity="0.9" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-serif">Welcome to Brain Spark</CardTitle>
                <CardDescription>
                  Your AI-powered knowledge companion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={isSignUp ? 'signup' : 'signin'} onValueChange={(v) => setIsSignUp(v === 'signup')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="signin-password">Password</Label>
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-primary hover:underline"
                            disabled={loading}
                          >
                            Forgot?
                          </button>
                        </div>
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                      </Button>
                    </motion.form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign Up
                      </Button>
                    </motion.form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
