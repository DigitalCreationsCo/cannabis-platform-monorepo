import { useAutoAnimate } from '@formkit/auto-animate/react'
import { LegacyRef } from 'react'

const Animate = Component => {
    const parent = useAutoAnimate({})

    return (
    <div ref={parent as LegacyRef<HTMLDivElement>}>
    {Component}
    </div>)
}

// class Animate extends React.Component {
//     constructor (Component: JSX.Element) {
//         super(Component)
//     }
//     Component = this.props.Component

//     render() {
//     const parent = useAutoAnimate({})

//     return (
//     <div ref={parent}>
//     {Component}
//     </div>)
//     }
// }

export default Animate