import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { RecallCard } from '@/components/card/RecallCard';
import { AugmentPanel } from '@/components/augment/AugmentPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share, MoreVertical } from 'lucide-react';

export default function Document() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<any>(null);
  const [selectedText, setSelectedText] = useState('');
  const [showAugmentPanel, setShowAugmentPanel] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState<{ x: number; y: number } | null>(null);

  // Mock card data - in real app this would be fetched based on documentId
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCard({
        id: documentId,
        title: 'Understanding Machine Learning Fundamentals',
        type: 'url',
        source: 'https://ml-fundamentals.com/intro',
        content: `Machine learning is a subset of artificial intelligence that focuses on the development of computer programs that can access data and use it to learn for themselves.

The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide. The primary aim is to allow the computers learn automatically without human intervention or assistance and adjust actions accordingly.

Some machine learning methods include:

**Supervised Learning**: This type of learning is where you have input variables (X) and output variables (Y) and you use an algorithm to learn the mapping function from the input to the output. The goal is to approximate the mapping function so well that when you have new input data (X) you can predict the output variables (Y) for that data.

**Unsupervised Learning**: This is where you only have input data (X) and no corresponding output variables. The goal for unsupervised learning is to model the underlying structure or distribution in the data in order to learn more about the data.

**Reinforcement Learning**: This is where an agent learns to behave in an environment, by performing certain actions and observing the results/rewards/results of these actions.

The field of machine learning is constantly evolving, with new algorithms and techniques being developed regularly. Understanding these fundamentals provides a strong foundation for exploring more advanced topics in artificial intelligence and data science.`,
        summary: 'An introduction to machine learning covering the basic concepts, types of learning (supervised, unsupervised, reinforcement), and the fundamental principles behind how computers can learn from data.',
        tags: ['machine learning', 'AI', 'fundamentals', 'data science'],
        createdAt: '2024-01-15',
        readingTime: 8
      });
    }, 500);
  }, [documentId]);

  // Handle text selection for augment panel
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      
      if (selectedText && selectedText.length > 10) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        if (rect) {
          setSelectedText(selectedText);
          setSelectionPosition({
            x: rect.left + rect.width / 2,
            y: rect.top
          });
          setShowAugmentPanel(true);
        }
      }
    };

    const handleClickOutside = () => {
      setShowAugmentPanel(false);
      setSelectedText('');
    };

    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (!card) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-washi/30">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/knowledge')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Knowledge Hub
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <RecallCard card={card} />

        {/* Augment Panel */}
        <AugmentPanel
          selectedText={selectedText}
          isVisible={showAugmentPanel}
          onClose={() => {
            setShowAugmentPanel(false);
            setSelectedText('');
          }}
          position={selectionPosition || undefined}
        />
      </div>
    </AppLayout>
  );
}