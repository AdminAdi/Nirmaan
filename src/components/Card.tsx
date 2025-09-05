import { forwardRef } from 'react';
import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  variant?: string;
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ variant, hoverable, children, ...rest }, ref) => {
  const styles = useStyleConfig('Card', { variant });
  
  return (
    <Box
      ref={ref}
      __css={styles}
      transition="all 0.2s"
      _hover={hoverable ? { transform: 'translateY(-4px)', shadow: 'md' } : {}}
      {...rest}
    >
      {children}
    </Box>
  );
});

const CardHeader = (props: BoxProps) => (
  <Box px={6} py={4} borderBottomWidth="1px" {...props} />
);

const CardBody = (props: BoxProps) => <Box p={6} {...props} />;

const CardFooter = (props: BoxProps) => (
  <Box px={6} py={4} borderTopWidth="1px" {...props} />
);

export { Card, CardHeader, CardBody, CardFooter };
