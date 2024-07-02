import React from 'react';
import {
    Box, 
    Text
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const InfoBox = props => {
    const value = props.value;
    const text = props.text;
    const format = props.format;
    let formattedValue;

    if (format) {
        formattedValue = format(value);
    } else {
        formattedValue = value;
    }
    
    return (
        <>
            <Box
                borderRadius='lg'
                borderColor='gray.500'
                borderWidth='1px'
                fontSize='md'
                w='3rem'>
                    <Text ml='0'>
                        {formattedValue}
                    </Text>
                    <Text ml='2rem'>
                        {text}
                    </Text>
                </Box>
        </>
    )
}

InfoBox.propTypes = {
    value: PropTypes.oneOfType(
        [PropTypes.number, PropTypes.string, PropTypes.array]
    ),
    text: PropTypes.string,
    format: PropTypes.func,
};

export default InfoBox;