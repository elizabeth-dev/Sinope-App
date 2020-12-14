import { PostActions } from '@core/state/actions/post.actions';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { Animated, LayoutChangeEvent, ToastAndroid, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Divider } from 'react-native-paper';
import { Avatar } from '../avatar/Avatar.component';
import { PostStyles as styles } from './Post.styles';
import { FlatButton } from '../flat-button/FlatButton.component';
import { IconButton } from '../icon-button/IconButton.component';
import { Typography } from '../typography/Typography.component';

export interface PostProps {
	post: FullPost;
	currentProfile: string;
	stackId: string;
	mainPostY: number;
	onLayout: (ev: LayoutChangeEvent) => void;
}

export const Post: React.FC<PostProps> = ({
	post,
	currentProfile,
	mainPostY,
	onLayout,
	stackId,
}) => {
	const dispatcher = useAppDispatch();

	const onClick = () => {
		ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
	};
	const onAvatarClick = () => Navigation.push(stackId, profileScreenLayer(post.profile.id));
	const onReplyClick = () => Navigation.push(stackId, composeScreenLayer(post.id));
	const onLikeClick = () => dispatcher(PostActions.like(post.id, currentProfile));

	return (<Animated.View
		style={[styles.root, { transform: [{ translateY: mainPostY }] }]}
		onLayout={onLayout}
	>
		<View style={styles.card}>
			<View style={styles.header}>
				<Avatar
					style={styles.avatar}
					label="E"
					onPress={onAvatarClick}
				/>
				<View style={styles.userData}>
					<Typography.Headline>{post.profile.name}</Typography.Headline>
					<Typography.Subtitle>@{post.profile.tag}</Typography.Subtitle>
				</View>
				<IconButton
					icon="dots-vertical"
					onPress={onClick}
				/>
			</View>
			<View style={styles.content}>
				<Typography.Body>{post.content}</Typography.Body>
				<Typography.Caption>{post.date.toLocaleString()}</Typography.Caption>
			</View>
			<Divider />
			<View style={styles.actions}>
				<FlatButton
					icon="message-reply-text"
					onPress={onReplyClick}
					style={styles.replyButton}
				>
					0
				</FlatButton>
				<FlatButton
					icon="star-circle"
					onPress={onLikeClick}
				>
					{post.likes.length.toString()}
				</FlatButton>
				<FlatButton
					icon="share"
					onPress={onClick}
				>
					0
				</FlatButton>
			</View>
		</View>
		<Divider />
	</Animated.View>);
};
