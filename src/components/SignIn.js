// import { useState } from 'react';
import { Box, Grid, VStack, Text, Button } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Logo } from "../Logo";

const SignIn = ({ connectHandler }) => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>Connect wallet to log in !</Text>
          <Button colorScheme="teal" variant="outline" onClick={connectHandler}>
            Connect Wallet
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
};

export default SignIn;
