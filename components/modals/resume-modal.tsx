"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom DialogContent without the built-in close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Use a single source of truth for the resume URL. Files in `public/` are served from root.
  const resumeUrl = '/My-Resume.pdf';

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ayan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openInNewTab = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  // Many mobile browsers (iOS/Android) block inline PDF rendering. Detect and avoid embedding.
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <CustomDialogContent className="max-w-4xl w-full h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle>Resume</DialogTitle>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadResume}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openInNewTab}
                className="flex items-center gap-2"
              >
                Open in new tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 p-4 pt-2 flex flex-col justify-start">
          <div className="w-full h-full border border-border rounded-lg overflow-hidden">
            {isMobile ? (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="text-center px-4">
                  <p className="text-muted-foreground mb-4">
                    Inline PDF viewers are limited on mobile. Open in a new tab or download.
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Button onClick={openInNewTab} className="flex items-center gap-2">
                      Open in new tab
                    </Button>
                    <Button onClick={downloadResume} variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <iframe src={`${resumeUrl}#view=FitH`} className="w-full h-full" title="Resume PDF" />
            )}
          </div>
        </div>
      </CustomDialogContent>
    </Dialog>
  );
}
