import { Link } from 'react-router-dom';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../ui/popover';
import '../index.css';

const DropdownMenu = () => {
  return (
    <Popover>
      <PopoverTrigger className="dropdown-icon">
  <svg width="22" height="24" className="text-secondary">
    <g fill="none">
      <g fill="currentColor" transform="translate(0 3)">
        <rect width="24" height="2" rx="1"></rect>
        <rect width="24" height="2" y="8" rx="1"></rect>
        <rect width="24" height="2" y="16" rx="1"></rect>
      </g>
    </g>
  </svg>
</PopoverTrigger>

<PopoverContent className="dropdown-content" align="end">
  <Link to="/" className="text-link">Telegram</Link>
  <Link to="/" className="text-link">Instagram</Link>
</PopoverContent>

    </Popover>
  );
};

export default DropdownMenu;
