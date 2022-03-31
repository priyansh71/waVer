import React, {useEffect, useState} from 'react'
import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";
import { Button, Center, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

const Main = () => {
    let [waveCount, setWaveCount] = useState(0);
    const [currentAccount, setCurrentAccount] = useState("");
    

    const contractAddress = "0xb8E9254121F845AC50fB4A7B66f68FdA7fE515b9";
    const contractABI = abi.abi;

    const waveUpdater = () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
                wavePortalContract.getTotalWaves().then(result => {
                    setWaveCount(result.toNumber());
                })
                .catch(error => {
                    console.log(error);
                });
            }
            else {
                console.log("Ethereum object doesn't exist!");
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        waveUpdater();
    }, [waveCount]);

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            /*
             * Check if we're authorized to access the user's wallet
             */ 
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Implement your connectWallet method here
     */
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
            const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            
            /*
            * Execute the actual wave from your smart contract
            */
            const waveTxn = await wavePortalContract.doWave();
            console.log("Mining...", waveTxn.hash);
    
            await waveTxn.wait();
            console.log("Mined -- ", waveTxn.hash);
            
            setWaveCount(++waveCount);
            console.log("wavecount is now", waveCount);
        } else {
            console.log("Ethereum object doesn't exist!");
        }
        } catch (error) {
          console.log(error);
        }
      }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <Center mt="32">
            <Flex flexDirection="column">
                <Heading textAlign="center" size="3xl" fontFamily="Quicksand"> Hola, Amigos! </Heading>

                <Text color={useColorModeValue("purple","pink")} my="3" fontSize="1.5em" >
                    I am Priyansh.
                    <br />
                    I like working with the Web.
                </Text>

                <Text textAlign="center" className="waves" my="2" fontFamily="nunito" fontSize="1.3em">
                    Total waves : {waveCount}
                </Text>
                <Center>
                <Button className="waveButton" onClick={wave} my="6" bg="teal" color="white" _hover={{
                    bg : "teal.400"
                }} minW="14vw" maxW="20vw" mt="5" fontSize="1.1em">
                    Wave at Me
                </Button>
                </Center>

                

                {!currentAccount && (
                    <Center>
                    <Button onClick={connectWallet} minW="14vw" maxW="20vw" fontSize="1.1em" bg="pink.500" color="white" _hover={{
                        bg : "purple.400"
                    }}>
                        Connect Wallet
                    </Button>
                    </Center>
                )}
                </Flex>
        </Center>
    );
}

export default Main