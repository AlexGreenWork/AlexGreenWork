import React from "react"

class List extends React.Component
{
    constructor(prop) {
        super(prop);
        console.log(prop);
    }

    render() {
        return (
            <table style={{width: "100%", color: "black", zIndex: 1}}>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                </tr>
            </table>
        )
    }
}

export default List