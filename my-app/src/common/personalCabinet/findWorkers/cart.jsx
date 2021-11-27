import React from "react"

class Cart extends React.Component
{
    constructor(props) {
        console.log("qwe");
        super(props);
    }
    render()
    {
        return (
            <div style={
                            {
                                width: "200px",
                                height: "200px",
                                backgroundColor: "red"
                            }
                        }>
                <p>
                    Hello World
                </p>
            </div>
        )
    }
}

export default Cart
