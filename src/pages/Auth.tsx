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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Main auth card */}
      <Card className="w-full max-w-md relative z-10 bg-card border border-border/50 shadow-xl rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {showResetPassword ? (
            <motion.div
              key="reset-password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="hsl(var(--primary))" opacity="0.9" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">Reset Password</CardTitle>
                <CardDescription className="text-sm">
                  Enter your new password
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={loading}
                      variant="filled"
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 rounded-lg" disabled={loading}>
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
              transition={{ duration: 0.2 }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="hsl(var(--primary))" opacity="0.9" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">Forgot Password?</CardTitle>
                <CardDescription className="text-sm">
                  We'll send you a reset link
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      variant="filled"
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 rounded-lg" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-10 rounded-lg"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="hsl(var(--primary))" opacity="0.9" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">Welcome to Brain Spark</CardTitle>
                <CardDescription className="text-sm">
                  Your AI-powered knowledge companion
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Tabs value={isSignUp ? 'signup' : 'signin'} onValueChange={(v) => setIsSignUp(v === 'signup')}>
                  <TabsList className="grid w-full grid-cols-2 h-10 p-1 rounded-lg bg-muted/50">
                    <TabsTrigger value="signin" className="rounded-md text-sm font-medium">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="rounded-md text-sm font-medium">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="mt-4">
                    <motion.form
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <Label htmlFor="signin-email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                          variant="filled"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-xs text-primary hover:underline"
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
                          variant="filled"
                        />
                      </div>
                      <Button type="submit" className="w-full h-10 rounded-lg" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                      </Button>
                      
                      <div className="relative my-3">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-card px-2 text-muted-foreground">
                            or try demo
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 rounded-lg"
                        onClick={() => {
                          setEmail('demo@example.com');
                          setPassword('Demo123456');
                          toast.info('Demo credentials filled. Click Sign In to continue.');
                        }}
                        disabled={loading}
                      >
                        <span className="mr-2">🎭</span>
                        Try Demo Account
                      </Button>
                    </motion.form>
                  </TabsContent>

                  <TabsContent value="signup" className="mt-4">
                    <motion.form
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          disabled={loading}
                          variant="filled"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                          variant="filled"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={loading}
                          variant="filled"
                        />
                      </div>
                      <Button type="submit" className="w-full h-10 rounded-lg" disabled={loading}>
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
