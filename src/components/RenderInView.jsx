// import { useInView } from 'react-intersection-observer';

// const RenderInView = ({children, height="1000px"}) => {
//     const { ref, inView, entry } = useInView({
//         threshold: 0,
//     });

//     return (
//         <div ref={ref} style={{height:height}}>
//             {inView && children}
//         </div>
//     )
// }
// export default RenderInView;

import { useInView } from 'react-intersection-observer';
import { createContext, useContext } from 'react';

export const InViewContext = createContext(false); 

const RenderInView = ({children, height="1000px"}) => {
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    return (
        <div ref={ref} style={{height}}>
            <InViewContext.Provider value={inView}>
                {children}
            </InViewContext.Provider>
        </div>
    )
}
export default RenderInView;