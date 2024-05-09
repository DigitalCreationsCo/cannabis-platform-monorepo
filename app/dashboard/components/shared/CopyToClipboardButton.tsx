import { copyToClipboard } from '@cd/core-lib';
import { Button } from '@cd/ui-lib';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

interface CopyToClipboardProps {
  value: string;
}

const CopyToClipboardButton = ({ value }: CopyToClipboardProps) => {
  const { t } = useTranslation('common');

  const handleCopy = () => {
    copyToClipboard(value);
    toast.success(t('copied-to-clipboard'));
  };

  return (
    <Button
      size="sm"
      className="tooltip p-0"
      data-tip={t('copy-to-clipboard')}
      onClick={handleCopy}
    >
      <ClipboardDocumentIcon className="w-5 h-5 text-secondary" />
    </Button>
  );
};

export default CopyToClipboardButton;
