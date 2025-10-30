
import React, { useState } from 'react';

interface CodeBlockProps {
    fileName: string;
    language: string;
    code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ fileName, language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden mb-4">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
                <p className="text-sm font-semibold text-gray-300">{fileName}</p>
                <button 
                    onClick={handleCopy}
                    className="text-xs font-medium bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
};
