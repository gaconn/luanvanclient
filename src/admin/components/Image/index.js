import React from 'react'
import { Container } from './Image.style'

const Image = ({src, alt}) => {
  return (
    <Container>
        <Image src={src} alt={alt}/>
    </Container>
  )
}

export default Image