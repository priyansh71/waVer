import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
    Button,
    Center,
    Flex,
    Heading,
    Text,
    Textarea,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import abi from "../utils/WavePortal.json";

const Main = () => {
    let [waveCount, setWaveCount] = useState(0);
    const [currentAccount, setCurrentAccount] = useState("");
    const [allWaves, setAllWaves] = useState([]);
    const [message, setMessage] = useState("");
    const bg = useColorModeValue("red.100", "pink.800");
    const textColor = useColorModeValue("black", "white");
    const contractAddress = "0xD5539e2BAf484774708e5511F7033E9953a338d5";
    const contractABI = abi.abi;

    const waveUpdater = () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                wavePortalContract
                    .getTotalWaves()
                    .then((result) => {
                        setWaveCount(result.toNumber());
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
                getAllWaves();
                waveUpdater();
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const wave = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );

                setMessage(message);
                const waveTxn = await wavePortalContract.wave(message);
                setMessage("");
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                setWaveCount(++waveCount);
                getAllWaves();
                console.log("wave count is now", waveCount);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllWaves = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );

                const waves = await wavePortalContract.getAllWaves();

                let wavesCleaned = [];
                waves.forEach((wave) => {
                    wavesCleaned.push({
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message,
                    });
                });

                setAllWaves(wavesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <Center mt="24">
            <Flex flexDirection="column">
                <Heading textAlign="center" size="3xl" fontFamily="Quicksand">
                    Hola, Amigos!
                </Heading>
        <Center flexDir="column">
                <Text
                    color={useColorModeValue("purple", "pink")}
                    my="4"
                    fontSize="1.5em"
                >
                    I am Priyansh.
                    <br />I like working with the Web.
                </Text>

                <Text
                    textAlign="center"
                    className="waves"
                    my="2"
                    fontFamily="nunito"
                    fontSize="1.3em"
                >
                    Total waves : {waveCount}
                </Text>


                <Textarea
                    value={message}
                    w="50vw"
                    onChange={(e) => setMessage(e.target.value)}
                    my="4"
                    borderColor="gray.300"
                    focusBorderColor="gray.700"
                    placeholder="Write your message here"
                    rows={10}
                    cols={40}
                />
    </Center>
                <Center>
                    <Button
                        className="waveButton"
                        onClick={wave}
                        bg="pink.800"
                        color="white"
                        _hover={{
                            bg: "purple.400",
                        }}
                        minW="14vw"
                        maxW="20vw"
                        my="5"
                        fontSize="1.1em"
                    >
                        Wave at Me
                    </Button>
                </Center>

                {!currentAccount && (
                    <Center>
                        <Button
                            onClick={connectWallet}
                            minW="14vw"
                            maxW="20vw"
                            fontSize="1.1em"
                            bg="teal"
                            mb="5"
                            color="white"
                            _hover={{
                                bg: "teal.400",
                            }}
                        >
                            Connect Wallet
                        </Button>
                    </Center>
                )}

                {allWaves.map((wave, index) => {
                    return (
                        <VStack
                            key={index}
                            bg={bg}
                            minW="60vw"
                            my="8"
                            color={textColor}
                            borderRadius="5"
                            p="4"
                            spacing="4"
                        >
                            <Text>
                                <strong>Address :</strong> {wave.address}
                            </Text>
                            <Text>
                                <strong>Timestamp :</strong>{" "}
                                {wave.timestamp.toString()}
                            </Text>
                            <Text>
                                <strong>Message :</strong> {wave.message}
                            </Text>
                        </VStack>
                    );
                })}
            </Flex>
        </Center>
    );
};

export default Main;
