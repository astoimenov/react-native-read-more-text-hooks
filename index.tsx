import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  ReactNode
} from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const HiddenView = styled(View)`
  opacity: 0;
  position: absolute;
`;

const measureHeightAsync = async (
  component: React.RefObject<Text>
): Promise<number> => {
  return new Promise(resolve => {
    if (component.current) {
      component.current.measure(
        (x: number, y: number, width: number, height: number) => {
          resolve(height);
        }
      );
    } else {
      resolve(0);
    }
  });
};

const nextFrameAsync = async () => {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
};

const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;

    return () => (isMounted.current = false);
  }, []);

  return isMounted;
};

interface Props {
  numberOfLines: number;
  children: ReactNode;
  renderTruncatedFooter?: (onclick: () => void) => ReactNode;
  renderRevealedFooter?: (onclick: () => void) => ReactNode;
  onReady?: () => {};
}

const ReadMore = ({
  numberOfLines,
  children,
  renderTruncatedFooter,
  renderRevealedFooter,
  onReady
}: Props) => {
  const [measured, setMeasured] = useState<boolean>(false);
  const [showAllText, setShowAllText] = useState<boolean>(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState<boolean>(false);

  const textRef = useRef<Text>(null);

  const _handlePressReadMore = () => {
    setShowAllText(true);
  };

  const _handlePressReadLess = () => {
    setShowAllText(false);
  };

  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    const measure = async () => {
      await nextFrameAsync();

      if (!isMounted.current) {
        return;
      }

      // Get the height of the text with no restriction on number of lines
      const fullHeight = await measureHeightAsync(textRef);

      setMeasured(true);
      await nextFrameAsync();

      if (!isMounted.current) {
        return;
      }

      const limitedHeight = await measureHeightAsync(textRef);

      if (fullHeight > limitedHeight) {
        setShouldShowReadMore(true);
      } else {
        onReady && onReady();
      }
    };

    measure();
  }, [children]);

  useEffect(() => {
    onReady && onReady();
  }, [shouldShowReadMore]);

  const maybeRenderReadMore = () => {
    if (shouldShowReadMore && !showAllText) {
      if (renderTruncatedFooter) {
        return renderTruncatedFooter(_handlePressReadMore);
      }

      return <Text onPress={_handlePressReadMore}>Read more</Text>;
    } else if (shouldShowReadMore && showAllText) {
      if (renderRevealedFooter) {
        return renderRevealedFooter(_handlePressReadLess);
      }

      return <Text onPress={_handlePressReadLess}>Hide</Text>;
    }
  };

  return (
    <View>
      <HiddenView>
        <Text numberOfLines={measured ? numberOfLines : 0} ref={textRef}>
          {children}
        </Text>
      </HiddenView>

      <Text numberOfLines={showAllText ? 0 : numberOfLines}>{children}</Text>

      {maybeRenderReadMore()}
    </View>
  );
};

export default ReadMore;
