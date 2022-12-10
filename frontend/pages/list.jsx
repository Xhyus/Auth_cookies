import { useState } from 'react'
import { Container, Heading, Text, Button, Input, Stack } from "@chakra-ui/react"

export const getServerSideProps = async (context) => {
    return {
        props: {
            data: null
        }
    }
}

const list = () => {
    return (
        <div>list</div>
    )
}

export default list