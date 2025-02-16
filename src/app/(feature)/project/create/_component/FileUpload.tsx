import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface FileUploadProps {
    files: File[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ files, onChange }) => {
    return (
        <div className="space-y-4">
            <Label htmlFor="files" className="text-sm font-medium">
                Project Images <span className='text-red-500'>*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                    <Input
                        id="files"
                        type="file"
                        multiple
                        onChange={onChange}
                        className="hidden"
                        required
                    />
                    <Button
                        variant="outline"
                        onClick={() => document.getElementById('files')?.click()}
                        type="button"
                    >
                        Select images
                    </Button>
                </div>
                {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {files.map((file) => (
                            <div key={file.name} className="text-sm text-gray-600">
                                {file.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

interface PDFUploadProps {
    file: File[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PdfUpload: React.FC<PDFUploadProps> = ({ file, onChange }) => {
    const handleClick = () => {
        const input = document.getElementById('pdf-file') as HTMLInputElement;
        input?.click();
    };

    return (
        <div className="space-y-4">
            <Label htmlFor="pdf-file" className="text-sm font-medium">
                Project PDF 
            </Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                    <Input
                        id="pdf-file"
                        type="file"
                        accept=".pdf"
                        onChange={onChange}
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        onClick={handleClick}
                        type="button"
                    >
                        Select pdf
                    </Button>
                </div>
                {file.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {file.map((file) => (
                            <div key={file.name} className="text-sm text-gray-600">
                                {file.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
