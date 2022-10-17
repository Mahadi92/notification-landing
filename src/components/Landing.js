// import { useState } from 'react';
import {
  Box,
  Grid,
  VStack,
  Text,
  Button,
  Flex,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BtnArrowIco from "./utils/icons/BtnArrowIco";
import TelegramIco from "./utils/icons/TelegramIco";
import TelegramWhiteIco from "./utils/icons/TelegramWhiteIco";
import mobileImg from "../utils/images/phone.png";
import BlockchainIco1 from "./utils/icons/BlockchainIco1";
import BlockchainIco2 from "./utils/icons/BlockchainIco2";
import BlockchainIco3 from "./utils/icons/BlockchainIco3";
import BlockchainIco4 from "./utils/icons/BlockchainIco4";
import NotificationIco1 from "./utils/icons/NotificationIco1";
import NotificationIco2 from "./utils/icons/NotificationIco2";
import NotificationIco3 from "./utils/icons/NotificationIco3";
import { useMediaQuery } from "@chakra-ui/react";

const Landing = ({ connectHandler }) => {
  const [isMobile] = useMediaQuery("(min-width: 992px)");
  return (
    <Box
      minH="100vh"
      h={{ base: "auto", lg: "100vh" }}
      // height={"100vh"}
      fontSize="xl"
      sx={isMobile && { overflow: "hidden" }}
    >
      <Flex
        h={"10vh"}
        py={{ base: 5, lg: 10 }}
        px={{ base: 5, sm: 10, lg: 20 }}
        spacing={5}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Link className="brand-logo">TOBORO</Link>
        <Button
          variant="outline"
          sx={{ borderColor: "#fff", lineHeight: "58px", color: "#9DCBF0" }}
          gap={3}
          onClick={connectHandler}
        >
          <BtnArrowIco />
          Connect Wallet
        </Button>
      </Flex>
      <Box pt={10} px={{ base: 5, sm: 10, lg: 20 }} h={"90vh"}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={6}
        >
          <GridItem p={{ base: 5, xl: 20 }}>
            <Flex
              flexDirection={"column"}
              align={{ base: "center", lg: "start" }}
            >
              <Box
                fontSize={{ base: "36px", lg: "48px" }}
                sx={{ fontFamily: "Syne", fontWeight: "700" }}
              >
                Receive updates <br /> about wallets <br />
                <Text sx={{ display: "flex" }} gap={5}>
                  in <TelegramIco /> <Text color="#5A97DB">Telegram</Text>
                </Text>
              </Box>
              <Text py={6} fontSize="lg" color="#A3AEBE">
                Simple solution to follow activities in all of your wallets
              </Text>
              <Button gap={5} mt={10} background="#4880C8" color="white">
                <TelegramWhiteIco /> Open Telegram bot
              </Button>
              <Text py={3} color="#748094">
                Follow instructions in Telegram
              </Text>
            </Flex>
          </GridItem>
          <GridItem
            className="landing__img-grid"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <Box className="landing__img_box-top">
              <Text>Receive notification on</Text>
              <Flex justify="center" align="center" py={3} gap={8}>
                <NotificationIco1 />
                <NotificationIco2 />
                <NotificationIco3 />
              </Flex>
            </Box>
            <Image
              src={mobileImg}
              objectFit={"cover"}
              mt={{ base: 0, lg: "20" }}
              sx={{
                // display: "block",
                // margin: "20px",
                width: "420px",
                height: "785px",
              }}
              alt=""
            />
            <Box className="landing__img_box-bottom">
              <Text>Supported Blockchains</Text>
              <Flex justify="center" align="center" py={3} gap={8}>
                <BlockchainIco1 />
                <BlockchainIco2 />
                <BlockchainIco3 />
                <BlockchainIco4 />
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Landing;
