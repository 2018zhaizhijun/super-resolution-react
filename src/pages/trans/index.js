import React, { memo } from 'react';
import TransBlock from '@components/tran-block';
import transStyle from './style.module.css';

export default memo(function Trans(props) {
    return (
        <div className={transStyle.transPage+' transPage'}>
            <TransBlock />
        </div>
    );
});