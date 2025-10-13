import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileJson, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ExportImportDialog() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Gather all app data from localStorage
      const appData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: {
          bookmarks: localStorage.getItem('bookmarks') || '[]',
          collections: localStorage.getItem('collections') || '[]',
          notes: localStorage.getItem('notes') || '[]',
          settings: localStorage.getItem('userSettings') || '{}',
          interests: localStorage.getItem('interests') || '[]',
        }
      };

      // Create blob and download
      const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `brain-spark-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Export successful',
        description: 'Your data has been exported successfully.',
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'Failed to export data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus('idle');

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      if (!data.version || !data.data) {
        throw new Error('Invalid file format');
      }

      // Import data to localStorage
      if (data.data.bookmarks) localStorage.setItem('bookmarks', data.data.bookmarks);
      if (data.data.collections) localStorage.setItem('collections', data.data.collections);
      if (data.data.notes) localStorage.setItem('notes', data.data.notes);
      if (data.data.settings) localStorage.setItem('userSettings', data.data.settings);
      if (data.data.interests) localStorage.setItem('interests', data.data.interests);

      setImportStatus('success');
      toast({
        title: 'Import successful',
        description: 'Your data has been imported. Please refresh the page.',
      });

      // Refresh after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setImportStatus('error');
      toast({
        title: 'Import failed',
        description: 'Failed to import data. Please check the file format.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileJson className="w-4 h-4" />
          Export/Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export & Import Data</DialogTitle>
          <DialogDescription>
            Backup your data or import from a previous backup
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Download all your bookmarks, collections, notes, and settings as a JSON file.
              </p>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="w-full gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Export Data'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Import data from a previously exported JSON file. This will merge with your existing data.
              </p>
              
              {importStatus === 'success' && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Import successful! Refreshing page...
                  </AlertDescription>
                </Alert>
              )}

              {importStatus === 'error' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Import failed. Please check your file.
                  </AlertDescription>
                </Alert>
              )}

              <label htmlFor="import-file">
                <Button 
                  variant="outline"
                  disabled={isImporting}
                  className="w-full gap-2"
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    {isImporting ? 'Importing...' : 'Choose File'}
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </span>
                </Button>
              </label>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
