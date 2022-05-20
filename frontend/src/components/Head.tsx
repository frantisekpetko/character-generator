import React from "react";

import { Helmet } from "react-helmet";
import Icon from './../images/favicon.png';

const Head = (props) => {
    return <><Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap" rel="stylesheet"/>

        <title>{props.title}</title>
        <link rel="canonical" href={`${window.location.hostname}:${window.location.port}`} />
        <link rel="icon" type="image/x-icon" href={Icon}/>
    </Helmet></>;
};

export default Head;