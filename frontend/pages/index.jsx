import { useState } from "react"
import { Container, Heading, Text, Button, Input, Stack } from "@chakra-ui/react"
import Swal from "sweetalert2"

export const getServerSideProps = async (context) => {
  return {
    props: {
      data: null
    }
  }
}

const Home = () => {
  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="2xl" textAlign="center" my={10}>
        hola
      </Heading>
    </Container>
  )
}

export default Home