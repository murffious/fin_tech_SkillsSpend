import React, {forwardRef} from 'react';
import classNames from 'classnames';

import './List.css';

export const List = forwardRef(
  ({children, columns = 1, horizontal, style}, ref) => {
    return (
      <ul
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          } 
        }
        className={classNames("List")}
      >
        {children}
      </ul>
    );
  }
);
