import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { TypographyStyles as styles } from './Typography.styles';

export interface TypographyProps {
	children?: ReactNode;
	style?: StyleProp<TextStyle>;
	lines?: number;
	selectable?: boolean;
}

const _Typography: React.FC<TypographyProps & { _style: StyleProp<TextStyle> }> = ({
	children,
	_style,
	style,
	lines,
	selectable,
}) => (
	<Text style={[_style, style]} numberOfLines={lines} selectable={selectable}>
		{children}
	</Text>
);

export const Typography = {
	Headline: (props: TypographyProps) => <_Typography _style={styles.headline} {...props} />,
	Body: (props: TypographyProps) => <_Typography _style={styles.body} {...props} />,
	Subtitle: (props: TypographyProps) => <_Typography _style={styles.subtitle} {...props} />,
	Caption: (props: TypographyProps) => <_Typography _style={styles.caption} {...props} />,
	Button: (props: TypographyProps) => <_Typography _style={styles.button} {...props} />,
};
