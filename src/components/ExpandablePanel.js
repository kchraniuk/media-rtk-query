 import { useState } from 'react';
 import className from 'classnames';
 import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

 function ExpandablePanel({header, children, ...rest}) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }

    const classes = className('mb-2 border rounded', rest.className);

    return (
        <div className={classes}>
            <div className="flex p-2 justify-between items-center">
                <div className="flex flex-row items-center justify-between">
                {header}
                </div>
                <div onClick={handleClick} className="cursor-pointer">
                    { expanded ? <GoChevronDown /> : <GoChevronLeft /> }
                </div>
            </div>
            { expanded && <div className="p-2 border-t">{children}</div> }
        </div>
    );
 }

 export default ExpandablePanel;