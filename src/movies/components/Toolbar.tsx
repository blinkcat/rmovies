import React from 'react';
import classNames from 'classnames';
import styles from './Toolbar.module.scss';

export interface ToolbarProps {
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.root, className)}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/208x226-stacked-green-9484383bd9853615c113f020def5cbe27f6d08a84ff834f41371f223ebad4a3c.png"
        height="26"
        alt="icon"
      />
      {children}
    </div>
  );
};

export default Toolbar;
