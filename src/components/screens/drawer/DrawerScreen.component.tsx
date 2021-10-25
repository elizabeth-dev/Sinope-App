import { Typography } from '@atoms/typography/Typography.component';
import { DrawerHeader } from '@molecules/drawer-header/DrawerHeader.component';
import { DrawerMenu } from '@molecules/drawer-menu/DrawerMenu.component';
import { DrawerProfiles } from '@molecules/drawer-profiles/DrawerProfiles.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import { FC, useState } from 'react';
import { View } from 'react-native';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';

export interface DrawerScreenProps {
	currentProfile?: IProfile;
	otherProfiles: IProfile[];
	onProfileSwitch: (profileId: string) => void;
	onProfileNav: (profileId: string) => void;
}

export const DrawerScreen: FC<DrawerScreenProps> = ({
	currentProfile,
	otherProfiles,
	onProfileNav,
	onProfileSwitch,
}) => {
	const [profilesTab, setProfilesTab] = useState(false);

	const items = [
		{
			key: 'settings',
			label: 'Settings',
			icon: 'cog',
		},
	];

	if (!currentProfile) {
		return (
			<View style={styles.root}>
				<Typography.Body>Loading...</Typography.Body>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			<DrawerHeader
				onTabSwitch={(tab) => setProfilesTab(tab)}
				profilesTab={profilesTab}
				currentProfile={currentProfile}
				otherProfiles={otherProfiles}
				onProfileSwitch={onProfileSwitch}
				onProfileNav={onProfileNav}
			/>
			{profilesTab ? <DrawerProfiles otherProfiles={otherProfiles} /> : <DrawerMenu items={items} />}
		</View>
	);
};
