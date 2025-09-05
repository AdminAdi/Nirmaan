import { useState } from 'react';
import { Box, Button, Card, CardBody, Container, FormControl, FormLabel, Heading, HStack, Input, PinInput, PinInputField, Text, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();

const KYCOTP = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [sentOtp, setSentOtp] = useState<string | null>(null);
    const [otp, setOtp] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const sendOtp = async () => {
        if (!/^\d{10}$/.test(phone)) {
            toast({ title: t('otp.invalidPhone'), status: 'error' });
            return;
        }
        setIsSending(true);
        await new Promise(r => setTimeout(r, 800));
        const code = generateOtp();
        setSentOtp(code);
        toast({ title: t('otp.otpSent'), description: `OTP: ${code}`, status: 'success' });
        setIsSending(false);
    };

    const verifyOtp = async () => {
        setIsVerifying(true);
        await new Promise(r => setTimeout(r, 600));
        if (otp === sentOtp) {
            toast({ title: t('otp.otpVerified'), status: 'success' });
            navigate('/kyc/face-verification');
        } else {
            toast({ title: t('otp.invalidOtp'), status: 'error' });
        }
        setIsVerifying(false);
    };

    return (
        <Container maxW="md" py={10}>
            <VStack spacing={6} align="stretch">
                <Heading size="lg">{t('otp.title')}</Heading>

                <Card>
                    <CardBody>
                        <VStack align="stretch" spacing={4}>
                            <FormControl isDisabled={!!sentOtp}>
                                <FormLabel>{t('otp.enterPhone')}</FormLabel>
                                <Input
                                    type="tel"
                                    placeholder="9998887776"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                />
                            </FormControl>

                            {!sentOtp ? (
                                <Button colorScheme="brand" onClick={sendOtp} isLoading={isSending}>
                                    {t('otp.sendOtp')}
                                </Button>
                            ) : (
                                <>
                                    <Box>
                                        <Text mb={2}>{t('otp.enterOtp')}</Text>
                                        <HStack>
                                            <PinInput otp value={otp} onChange={setOtp}>
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                                <PinInputField />
                                            </PinInput>
                                        </HStack>
                                    </Box>
                                    <HStack>
                                        <Button variant="outline" onClick={sendOtp}>{t('otp.resend')}</Button>
                                        <Button colorScheme="brand" onClick={verifyOtp} isLoading={isVerifying}>
                                            {t('otp.verify')}
                                        </Button>
                                    </HStack>
                                </>
                            )}
                        </VStack>
                    </CardBody>
                </Card>
            </VStack>
        </Container>
    );
};

export default KYCOTP;


