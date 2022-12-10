import { useState } from 'react'
import { Container, Heading, Text, Button, Input, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { getProducts } from "../data/product"
import Cookies from 'js-cookie'
import axios from "axios"

export const getServerSideProps = async (context) => {
    try {
        const response = await getProducts(context.req.headers.cookie)
        if (response.status === 200) {
            return {
                props: {
                    data: response.data
                }
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}

const list = ({ data }) => {

    const [products] = useState(data)
    const router = useRouter()
    const cerrar = async () => {
        await axios.get(`${process.env.servidor}/logout`)
        Cookies.remove("token")
        router.push("/")
    }

    return (
        <Container maxW="container.md">
            <Button colorScheme={"red"} onClick={cerrar}>Cerrar sesion</Button>
            <Heading as="h1" size="2xl" textAlign="center" my={10}>Lista de productos</Heading>
            <Stack>
                {products.map((product) => (
                    <Text key={product.id}>{product.name}</Text>
                ))}
            </Stack>
        </Container>
    )
}

export default list