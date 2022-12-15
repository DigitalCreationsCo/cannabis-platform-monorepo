import React from "react";

export default function IconWrapper({ Icon, ...rest}: {Icon: any}) {
    return (
        <Icon className={'align-items'} height={ 20 } width={ 20 } { ...rest } />
    );
}