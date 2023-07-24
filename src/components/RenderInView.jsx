import { useInView } from 'react-intersection-observer';

const RenderInView = ({children, height="1000px"}) => {
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    return (
        <div ref={ref} style={{height:height}}>
            {inView && children}
        </div>
    )
}
export default RenderInView;