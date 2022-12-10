import { useState } from 'react'
import { Container, Heading, Text, Button, Input, Stack } from "@chakra-ui/react"

export const getServerSideProps = async (context) => {
    return {
        props: {
            data: null
        }
    }
}

const productID = ({ data }) => {
    return (
        <div>productID</div>
    )
}

export default productID