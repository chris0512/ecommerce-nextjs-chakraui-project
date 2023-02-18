import { useParams } from 'react-router-dom';
import  {
    Box,
    Image,
    Text,
    Wrap,
    Stack,
    Spinner,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    Flex,
    Badge,
    Heading,
    HStack,
    Button,
    SimpleGrid,
    useToast
} from '@chakra-ui/react';

import {MinusIcon, StarIcon, SmallAddIcon, PlusSquareIcon} from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions'
import { addCartItem } from '../redux/actions/cartActions'
import React, { useEffect, useState } from 'react';

const ProductScreen = () => {

    const [amount, setAmount ] = useState(1);
    let { id } = useParams();
    const toast = useToast();

    // redux
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products)
    const { loading, error, product } = products;

    const cartContent = useSelector((state) => state.cart);
    const { cart } = cartContent;

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id, cart]);

    const changeAmount = (input) => {
        if(input === 'plus') {
            setAmount(amount + 1);
        }
        if(input === 'minus') {
            setAmount(amount - 1);
        }
    }

    const addItem = () => {
        dispatch(addCartItem(product._id, amount));
        toast({description: 'Item has been added', status: 'success', isClosable: true})
    }

    return (
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
            {loading ? (
                <Stack direction='row' spacing={4}>
                    <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
                </Stack>
        ): error ? (
                <Alert status='error'>
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>There is something wrong!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
        ) : (
            product &&
            <Box
                maxW={{base: '3xl', lg: '5xl'}}
                mx='auto'
                px={{base: '4', md: '8', lg:'12'}}
                py={{base: '6', md: '8', lg:'12'}}>
                <Stack direction={{ base: 'column', lg: 'row'}} align={{ lg: 'flex-start'}}>
                   <Stack
                       pr={{base: '0', md: '12'}}
                       spacing={{ base: 8, md: '4'}}
                       flex='1.5' mb={{base: '12', md:'none'}}>
                       {product.productIsNew && (
                           <Badge rounded='full' w='50px' fontSize='1em' fontWeight={800} textAlign='center' backgroundColor='green.200' color='green.800'>
                               New
                           </Badge>
                       )}
                       {product.stock === 0 && (
                           <Badge rounded='full' w='100px' fontSize='1em' fontWeight={800} textAlign='center' backgroundColor='red.200' color='red.800'>
                               Sold out
                           </Badge>
                       )}
                       <Heading fontSize='2xl' fontWeight='extrabold'>
                           {product.name}
                       </Heading>
                       <Stack spacing='5'>
                           <Box>
                               <Text fontSize='xl'>${product.price}</Text>
                               <Flex>
                                   <HStack spacing='2px'>
                                       <StarIcon color='orange.500' />
                                       <StarIcon color={product.rating >=2? 'orange.500': 'gray.200'} />
                                       <StarIcon color={product.rating >=3? 'orange.500': 'gray.200'} />
                                       <StarIcon color={product.rating >=4? 'orange.500': 'gray.200'} />
                                       <StarIcon color={product.rating >=5? 'orange.500': 'gray.200'} />
                                   </HStack>
                                   <Text fontSize='md' fontWeight='bold' ml='4px'>
                                       {product.numberOfReviews} Reviews
                                   </Text>
                               </Flex>
                           </Box>
                           <Text>{product.description}</Text>
                           <Text fontWeight={'bold'}>Quantity</Text>
                           <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                               <Button isDisabled={amount <= 1} onClick={()=> changeAmount('minus')}>
                                   <MinusIcon></MinusIcon>
                               </Button>
                               <Text mx='55px'>{amount}</Text>
                               <Button isDisabled={amount >= product.stock} onClick={()=> changeAmount('plus')}>
                                   <SmallAddIcon w='20px' h='25px' />
                               </Button>
                           </Flex>
                           <Button isDisabled={product.stock === 0} backgroundColor='orange.500' fontWeight='500' borderRadius='3px' onClick={() => addItem()}>
                               Add to cart
                           </Button>
                           <Stack width='270px'>
                                <Flex alignItems='center'>
                                    <BiPackage size='20px'></BiPackage>
                                    <Text fontWeight='medium' fontSize='sm' ml='2'>Free shipping if order is above $1000</Text>
                                </Flex>
                                <Flex alignItems='center'>
                                    <BiCheckShield size='20px'></BiCheckShield>
                                    <Text fontWeight='medium' fontSize='sm' ml='2'>2 year extend warranty</Text>
                                </Flex>
                                <Flex alignItems='center'>
                                    <BiSupport size='20px'></BiSupport>
                                    <Text fontWeight='medium' fontSize='sm' ml='2'>We are here for you 24/7</Text>
                                </Flex>
                           </Stack>
                       </Stack>
                   </Stack>
                    <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900'}} >
                            <Image mb='3ppx' src={product.image} alt={product.name} borderRadius="10%"></Image>

                    </Flex>
                    </Stack>
                    <Stack>
                        <Text fontSize='xl' fontWeight='bold'>
                            Reviews
                        </Text>
                        <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                            {product.reviews.map((review) => (
                                <Box key={review.id}>
                                    <Flex spacing='2px' alignItems='center'>
                                        <StarIcon color='orange.500'></StarIcon>
                                        <StarIcon color={review.rating >= 2 ? 'orange.500' : 'gray.200'}></StarIcon>
                                        <StarIcon color={review.rating >= 3 ? 'orange.500' : 'gray.200'}></StarIcon>
                                        <StarIcon color={review.rating >= 4 ? 'orange.500' : 'gray.200'}></StarIcon>
                                        <StarIcon color={review.rating >= 5 ? 'orange.500' : 'gray.200'}></StarIcon>
                                        <Text fontWeight='semibold' ml='4px'>
                                            {review.title && review.title }
                                        </Text>
                                    </Flex>
                                    <Box py='12px'>{review.comment}</Box>
                                    <Text fontSize='sm' color='gray.400'>by {review.name}, {new Date(review.createdAt).toDateString()}</Text>
                                </Box>
                                ))}
                        </SimpleGrid>
                    </Stack>

            </Box>

        )}
        </Wrap>
    )
}

export default ProductScreen;
