import React from 'react'

type Props = {
    children?: React.ReactNode;
};

export const TemplateSectionWithPadding = (props: Props) => {
    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>{props.children}</div>
    )
}