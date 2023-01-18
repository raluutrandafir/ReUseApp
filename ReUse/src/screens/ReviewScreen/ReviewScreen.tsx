/* eslint-disable comma-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, ImageBackground, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import RadioGroup from 'react-native-radio-buttons-group';
import ToggleSwitch from 'toggle-switch-react-native';

import { RootStackParams, Routes } from '../../app/navigation';
import { useUserStore } from '../../store/useUserStore';
import { Input } from '../../components';
import axios from 'axios';
import { Icons } from '../../environment/Icons';

export type ReviewScreenRouteType = RouteProp<RootStackParams, Routes.Review>;

interface Product {
    type: string;
    description1: string;
    description2: string;
    title1: string;
    title2: string;
    id: string;
    image1: string;
    image2: string;
    ownerId: string;
}

interface FormValues {
    message: string;
    contactInfo: string;
    donationTitle: string;
    donationDescription: string;
    swapsTitle1: string;
    swapsTitle2: string;
    swapsDescription1: string;
    swapsDescription2: string;
}

export function ReviewScreen() {
    const route = useRoute<ReviewScreenRouteType>();
    const type = route.params.type;
    const category = route.params.category;
    const subcategory = route.params.optionId;

    const navigation = useNavigation();

    const [product, setProduct] = useState<Product>();
    const [pageType, setPageType] = useState('Donation');
    const [isOn, setIsOn] = useState(false);

    const [radioButtons, setRadioButtons] = useState([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Donation',
            value: 'option1',
            selected: true
        },
        {
            id: '2',
            label: 'Swap',
            value: 'option2'
        }
    ]);

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);

        radioButtonsArray.map((item) => {
            if (item.selected === true) {
                setPageType(item.label);
            }
        });
    }
    const userId = useUserStore((state) => state.userId);

    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<FormValues>({
        defaultValues: {
            message: '',
            contactInfo: '',
            donationTitle: '',
            donationDescription: '',
            swapsTitle1: '',
            swapsTitle2: '',
            swapsDescription1: '',
            swapsDescription2: ''
        }
    });

    function handleGoBackPress() {
        navigation.goBack();
    }

    function getTitle() {
        if (route.params.type === 'submit') {
            return 'Submit your request';
        }

        if (route.params.type === 'evaluate') {
            return 'Evaluate the Request';
        }

        return '';
    }

    async function handleCreate({
        donationDescription,
        donationTitle,
        swapsTitle1,
        swapsTitle2,
        swapsDescription1,
        swapsDescription2
    }: FormValues) {
        if (pageType === 'Donation') {
            const response = await axios.post(
                'http://192.168.3.8:5000/api/products/insertdonationproduct',
                {
                    title1: donationTitle,
                    description1: donationDescription,
                    subcategory: subcategory,
                    image: null,
                    ownerId: userId
                }
            );

            if (response.data) {
                navigation.navigate(Routes.Choose);
                setValue('donationTitle', '');
                setValue('donationDescription', '');
            }
            return;
        }
        const response = await axios.post(
            'http://192.168.3.8:5000/api/products/insertswapproduct',
            {
                title1: swapsTitle1,
                title2: swapsTitle2,
                description1: swapsDescription1,
                description2: swapsDescription2,
                subcategory: subcategory,
                image1: null,
                image2: null,
                ownerId: userId
            }
        );
        if (response.data) {
            navigation.navigate(Routes.Choose);
            setValue('swapsTitle1', '');
            setValue('swapsTitle2', '');
            setValue('swapsDescription1', '');
            setValue('swapsDescription2', '');
        }
        return;
    }

    async function getProduct() {
        const response = await axios.get(
            'http://192.168.3.8:5000/api/products/getproductinformationforrequest',
            {
                params: { productId: route.params.productId }
            }
        );

        if (type === 'evaluate') {
            const result = await axios.get(
                'http://192.168.3.8:5000/api/products/getstatusforrequest',
                {
                    params: { requestId: route.params.messageId }
                }
            );
            setIsOn(result.data);
        }
        setProduct(response.data);
        return;
    }

    async function onSubmit({ message, contactInfo }: FormValues) {
        const response = await axios.post('http://192.168.3.8:5000/api/products/addrequest', {
            productId: product?.id,
            ownerId: product?.ownerId,
            requestorId: userId,
            message: message,
            contactInfo: contactInfo
        });
        if (response.data) {
            navigation.navigate(Routes.Choose);
            setValue('contactInfo', '');
            setValue('message', '');
        }
    }

    async function handleSendEvaluationPress() {
        const response = await axios.post(
            'http://192.168.3.8:5000/api/products/submitmessagestatus',
            null,
            {
                params: {
                    requestId: route.params.messageId,
                    evaluationStatus: isOn
                }
            }
        );

        if (response.data) {
            navigation.navigate(Routes.Choose);
        }
    }

    useEffect(() => {
        if (type !== 'add') {
            getProduct();
        }
    }, []);

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#F9F8F6',
                paddingHorizontal: 24
            }}
        >
            <Pressable
                onPress={handleGoBackPress}
                style={{ position: 'absolute', top: 40, left: 10, zIndex: 1 }}
            >
                <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>Go back</Text>
            </Pressable>
            {type !== 'add' && (
                <View>
                    <Text
                        style={{
                            alignSelf: 'center',
                            marginTop: 50,
                            fontSize: 25,
                            fontWeight: '600',
                            color: '#ABB28D'
                        }}
                    >
                        {getTitle()}
                    </Text>
                </View>
            )}
            {type === 'add' && (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <RadioGroup
                        layout="row"
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                    />
                </View>
            )}
            {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 4
                }}
            ></View> */}
            <View
                style={
                    {
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // justifyContent: 'space-between'
                    }
                }
            >
                {category === 'swap' && product ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 200,
                                backgroundColor: '#EBE3D3',
                                marginVertical: 8
                            }}
                        >
                            <ImageBackground
                                source={{
                                    uri: product?.image1
                                        ? product.image1
                                        : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'
                                }}
                                style={{
                                    width: 150,
                                    height: 130
                                }}
                            />
                            <Icons.SwapIcon style={{ alignSelf: 'center' }} />
                            <ImageBackground
                                source={{
                                    uri: product?.image1
                                        ? product.image1
                                        : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'
                                }}
                                style={{ width: 150, height: 130 }}
                            />
                        </View>
                        <Text
                            style={[
                                { fontSize: 16, fontWeight: '500' },
                                category === 'swap' && { width: '100%' }
                            ]}
                        >
                            {product?.title1}
                        </Text>
                        <Input
                            value={product.description1}
                            multiline
                            disabled={true}
                            placeHolderTextColor={'black'}
                            style={{
                                marginTop: 12,
                                width: '100%',
                                flex: 1,
                                height: 100,
                                backgroundColor: '#D9D9D9'
                            }}
                        />
                        <Icons.SwapIcon style={{ alignSelf: 'center' }} height={25} />
                        <Text
                            style={{ fontSize: 16, fontWeight: '500', width: '100%', marginTop: 8 }}
                        >
                            {product?.title2}
                        </Text>
                        <Input
                            value={product.description2}
                            multiline
                            disabled={true}
                            placeHolderTextColor={'black'}
                            style={{
                                marginTop: 12,
                                paddingHorizontal: 10,
                                // width: 140,
                                height: 100,
                                backgroundColor: '#D9D9D9'
                            }}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Request Message</Text>
                        <Controller
                            control={control}
                            name="message"
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    multiline
                                    value={value}
                                    onBlur={onBlur}
                                    disabled={type === 'evaluate'}
                                    onChangeText={onChange}
                                    placeHolderTextColor={'black'}
                                    label={type === 'evaluate' ? route.params.requestMessage : ''}
                                    style={{
                                        marginTop: 4,
                                        width: '100%',
                                        height: 100,
                                        backgroundColor: '#EBE3D3'
                                    }}
                                />
                            )}
                        />
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Contact Info</Text>
                        <Controller
                            control={control}
                            name="contactInfo"
                            rules={{
                                required: 'Contact Info Required'
                            }}
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    multiline
                                    error={!!errors.contactInfo}
                                    value={value}
                                    disabled={type === 'evaluate'}
                                    onBlur={onBlur}
                                    placeHolderTextColor={'black'}
                                    label={type === 'evaluate' ? route.params.contactInfo : ''}
                                    onChangeText={onChange}
                                    style={{
                                        marginTop: 4,
                                        width: '100%',
                                        height: 100,
                                        backgroundColor: '#EBE3D3'
                                    }}
                                />
                            )}
                        />
                        {type !== 'evaluate' && (
                            <Pressable
                                style={{
                                    backgroundColor: '#DBCAAA',
                                    width: 148,
                                    borderRadius: 20,
                                    height: 40,
                                    alignItems: 'center',
                                    marginBottom: 180,
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}
                                onPress={handleSubmit(onSubmit)}
                            >
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>Send</Text>
                            </Pressable>
                        )}
                        {type === 'evaluate' && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <ToggleSwitch
                                    isOn={isOn}
                                    onColor="#53d769"
                                    offColor="grey"
                                    label="Deny / Approve"
                                    labelStyle={{ color: 'black', fontWeight: '500' }}
                                    size="small"
                                    onToggle={() => setIsOn(!isOn)}
                                />
                                <Pressable onPress={handleSendEvaluationPress}>
                                    <Text style={{ fontWeight: '600' }}>Send Evaluation</Text>
                                </Pressable>
                            </View>
                        )}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                ) : (
                    <>
                        {type !== 'add' && (
                            <View style={{ width: '100%' }}>
                                <View style={{ backgroundColor: '#EBE3D3', marginVertical: 8 }}>
                                    <ImageBackground
                                        source={{
                                            uri: product?.image1
                                                ? product.image1
                                                : 'https://hearhear.org/wp-content/uploads/2019/09/no-image-icon.png'
                                        }}
                                        style={{
                                            width: 225,
                                            height: 194,
                                            marginTop: 4,
                                            marginLeft: 6,
                                            alignSelf: 'center'
                                        }}
                                    />
                                </View>

                                <Text style={[{ fontSize: 16, fontWeight: '500' }]}>
                                    {product?.title1}
                                </Text>
                                <Input
                                    value=""
                                    multiline
                                    disabled={true}
                                    placeHolderTextColor={'black'}
                                    label={product?.description1}
                                    style={{
                                        marginTop: 12,
                                        height: 98,
                                        backgroundColor: '#D9D9D9'
                                    }}
                                />
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                    Request Message
                                </Text>
                                <Controller
                                    control={control}
                                    name="message"
                                    render={({ field: { value, onBlur, onChange } }) => (
                                        <Input
                                            multiline
                                            value={value}
                                            onBlur={onBlur}
                                            disabled={type === 'evaluate'}
                                            onChangeText={onChange}
                                            placeHolderTextColor={'black'}
                                            label={
                                                type === 'evaluate'
                                                    ? route.params.requestMessage
                                                    : ''
                                            }
                                            style={{
                                                marginTop: 4,
                                                width: '100%',
                                                height: 100,
                                                backgroundColor: '#EBE3D3'
                                            }}
                                        />
                                    )}
                                />
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                    Contact Info
                                </Text>
                                <Controller
                                    control={control}
                                    name="contactInfo"
                                    rules={{
                                        required: 'Contact Info Required'
                                    }}
                                    render={({ field: { value, onBlur, onChange } }) => (
                                        <Input
                                            multiline
                                            error={!!errors.contactInfo}
                                            value={value}
                                            disabled={type === 'evaluate'}
                                            onBlur={onBlur}
                                            placeHolderTextColor={'black'}
                                            label={
                                                type === 'evaluate' ? route.params.contactInfo : ''
                                            }
                                            onChangeText={onChange}
                                            style={{
                                                marginTop: 4,
                                                width: '100%',
                                                height: 100,
                                                backgroundColor: '#EBE3D3'
                                            }}
                                        />
                                    )}
                                />
                                {type !== 'evaluate' && (
                                    <Pressable
                                        style={{
                                            backgroundColor: '#DBCAAA',
                                            width: 148,
                                            borderRadius: 20,
                                            height: 40,
                                            alignItems: 'center',
                                            marginBottom: 80,
                                            justifyContent: 'center',
                                            alignSelf: 'center'
                                        }}
                                        onPress={handleSubmit(onSubmit)}
                                    >
                                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                                            Send
                                        </Text>
                                    </Pressable>
                                )}
                                {type === 'evaluate' && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <ToggleSwitch
                                            isOn={isOn}
                                            onColor="#53d769"
                                            offColor="grey"
                                            label="Deny / Approve"
                                            labelStyle={{ color: 'black', fontWeight: '500' }}
                                            size="small"
                                            onToggle={() => setIsOn(!isOn)}
                                        />
                                        <Pressable onPress={handleSendEvaluationPress}>
                                            <Text style={{ fontWeight: '600' }}>
                                                Send Evaluation
                                            </Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        )}
                    </>
                )}
            </View>
            {type === 'add' && pageType === 'Donation' ? (
                <View>
                    {/* <View
                        style={[
                            {
                                marginTop: 24,
                                width: '100%',
                                height: 223,
                                backgroundColor: '#EBE3D3',
                                alignItems: 'center'
                            }
                        ]}
                    ></View> */}
                    <Controller
                        control={control}
                        name="donationTitle"
                        render={({ field: { value, onBlur, onChange } }) => (
                            <Input
                                value={value}
                                onBlur={onBlur}
                                maxLength={40}
                                onChangeText={onChange}
                                label="Product Tilte"
                                style={{ marginTop: 12 }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="donationDescription"
                        render={({ field: { value, onBlur, onChange } }) => (
                            <Input
                                value={value}
                                onBlur={onBlur}
                                multiline
                                onChangeText={onChange}
                                label="Product Description"
                                style={{ marginTop: 12, height: 200 }}
                            />
                        )}
                    />

                    <Pressable
                        style={{
                            backgroundColor: '#DBCAAA',
                            width: 148,
                            borderRadius: 20,
                            height: 40,
                            alignItems: 'center',
                            marginBottom: 80,
                            alignSelf: 'center'
                        }}
                        onPress={handleSubmit(handleCreate)}
                    >
                        <Text style={{ fontSize: 18, paddingTop: 10 }}>Create</Text>
                    </Pressable>
                </View>
            ) : (
                type !== 'evaluate' &&
                type === 'add' && (
                    <View>
                        {/* <View
                        style={[
                            {
                                marginTop: 24,
                                width: '100%',
                                height: 223,
                                backgroundColor: '#EBE3D3',
                                alignItems: 'center'
                            }
                        ]}
                    ></View> */}
                        <Controller
                            control={control}
                            name="swapsTitle1"
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    maxLength={40}
                                    label="Product Tilte"
                                    style={{ marginTop: 12 }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="swapsDescription1"
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    value={value}
                                    onBlur={onBlur}
                                    multiline
                                    onChangeText={onChange}
                                    label="Product Description"
                                    style={{ marginTop: 12, height: 100 }}
                                />
                            )}
                        />

                        <Text style={{ fontSize: 21, fontWeight: '600' }}>In exchange for</Text>
                        {/* <View
                        style={[
                            {
                                marginTop: 24,
                                width: '100%',
                                height: 223,
                                backgroundColor: '#D9D9D9',
                                alignItems: 'center'
                            }
                        ]}
                    ></View> */}
                        <Controller
                            control={control}
                            name="swapsTitle2"
                            render={({ field: { onBlur, value, onChange } }) => (
                                <Input
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    maxLength={40}
                                    label="Product Tilte"
                                    style={{ marginTop: 12, backgroundColor: '#D9D9D9' }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="swapsDescription2"
                            render={({ field: { value, onBlur, onChange } }) => (
                                <Input
                                    value={value}
                                    onBlur={onBlur}
                                    multiline
                                    onChangeText={onChange}
                                    label="Product Description"
                                    style={{
                                        marginTop: 12,
                                        height: 100,
                                        backgroundColor: '#D9D9D9'
                                    }}
                                />
                            )}
                        />
                        <Pressable
                            style={{
                                backgroundColor: '#DBCAAA',
                                width: 148,
                                borderRadius: 20,
                                height: 40,
                                alignItems: 'center',
                                marginBottom: 80,
                                alignSelf: 'center'
                            }}
                            onPress={handleSubmit(handleCreate)}
                        >
                            <Text style={{ fontSize: 18, paddingTop: 10 }}>Create</Text>
                        </Pressable>
                    </View>
                )
            )}
            {/* {type !== 'add' && (
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Request Message</Text>
            )} */}
            {/* {type !== 'add' && (
                <Controller
                    control={control}
                    name="message"
                    render={({ field: { value, onBlur, onChange } }) => (
                        <Input
                            multiline
                            value={value}
                            onBlur={onBlur}
                            disabled={type === 'evaluate'}
                            onChangeText={onChange}
                            placeHolderTextColor={'black'}
                            label={type === 'evaluate' ? route.params.requestMessage : ''}
                            style={{
                                marginTop: 4,
                                width: '100%',
                                height: 100,
                                backgroundColor: '#EBE3D3'
                            }}
                        />
                    )}
                />
            )} */}
            {/* {type !== 'add' && (
                <>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Contact Info</Text>
                    <Controller
                        control={control}
                        name="contactInfo"
                        rules={{
                            required: 'Contact Info Required'
                        }}
                        render={({ field: { value, onBlur, onChange } }) => (
                            <Input
                                multiline
                                error={!!errors.contactInfo}
                                value={value}
                                disabled={type === 'evaluate'}
                                onBlur={onBlur}
                                placeHolderTextColor={'black'}
                                label={type === 'evaluate' ? route.params.contactInfo : ''}
                                onChangeText={onChange}
                                style={{
                                    marginTop: 4,
                                    width: '100%',
                                    height: 100,
                                    backgroundColor: '#EBE3D3'
                                }}
                            />
                        )}
                    />
                </>
            )} */}
            {type !== 'add' && (
                <>
                    {/* {type === 'evaluate' && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <ToggleSwitch
                                isOn={isOn}
                                onColor="#53d769"
                                offColor="grey"
                                label="Deny / Approve"
                                labelStyle={{ color: 'black', fontWeight: '500' }}
                                size="small"
                                onToggle={() => setIsOn(!isOn)}
                            />
                            <Pressable onPress={handleSendEvaluationPress}>
                                <Text style={{ fontWeight: '600' }}>Send Evaluation</Text>
                            </Pressable>
                        </View>
                    )} */}
                    {/* {type !== 'evaluate' && (
                        <Pressable
                            style={{
                                backgroundColor: '#DBCAAA',
                                width: 148,
                                borderRadius: 20,
                                height: 40,
                                alignItems: 'center',
                                marginBottom: 80,
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>Send</Text>
                        </Pressable>
                    )} */}
                </>
            )}
        </View>
    );
}
