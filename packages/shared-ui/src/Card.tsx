import { H4, H6, Paragraph } from "."
import React from "react";
function Card({ title, amount }: { title: string; amount: string | number}) {
    return (
        <div className="shadow rounded-btn min-w-max p-4">
            <H6>{ title }</H6>
            <H4>{ amount }</H4>
        </div>
    );
}

export default Card;