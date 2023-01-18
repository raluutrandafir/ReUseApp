/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import axios from 'axios';

import { Icons } from '../../environment/Icons';

interface Props {
    type: string;
    title1: string;
    title2: string;
    requestId: string;
}

export function RequestCard({ type, title1, title2, requestId }: Props) {
    const [isApproved, setIsApproved] = useState(false);

    async function getStatus() {
        const result = await axios.get('http://192.168.3.8:5000/api/products/getstatusforrequest', {
            params: { requestId: requestId }
        });
        setIsApproved(result.data);
    }

    useEffect(() => {
        getStatus();
    }, []);

    return type === 'Donations' ? (
        <View
            style={{
                height: 91,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <View>
                <Text style={{ marginVertical: 8, marginLeft: 4 }}>Donation</Text>
                <Text style={{ marginLeft: 12, fontWeight: '600', fontSize: 16 }}>{title1}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', marginTop: 15 }}>
                <ToggleSwitch
                    isOn={isApproved}
                    onColor="#53d769"
                    disabled={true}
                    offColor="grey"
                    label={isApproved ? 'Approved' : 'Denied'}
                    labelStyle={{ color: 'black', fontWeight: '500' }}
                    size="small"
                    onToggle={() => {}}
                />
            </View>
        </View>
    ) : (
        <View
            style={{
                // height: 91,
                height: 125,
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#EBE3D3',
                marginTop: 12
            }}
        >
            <Text style={{ marginLeft: 13, marginVertical: 4 }}>Exchange</Text>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            marginVertical: 8,
                            height: 60,
                            width: 100,
                            fontWeight: '600'
                        }}
                    >
                        {title1}
                    </Text>
                    <Icons.SwapIcon width={45} style={{ marginHorizontal: 20 }} />
                    <Text style={{ marginVertical: 8, height: 60, width: 100, fontWeight: '600' }}>
                        {title2}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <ToggleSwitch
                        isOn={isApproved}
                        onColor="#53d769"
                        disabled={true}
                        offColor="grey"
                        label={isApproved ? 'Approved' : 'Denied'}
                        labelStyle={{ color: 'black', fontWeight: '500' }}
                        size="small"
                        onToggle={() => {}}
                    />
                </View>
            </View>
        </View>
    );
}
