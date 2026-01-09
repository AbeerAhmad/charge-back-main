import { closeActive } from '@/redux/slices/layer-slice';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React from 'react';
import { Keyboard, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';

const BackdropComponent = (props: any) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);

interface WithBottomSheetProps {
  onClose?: () => void;
  onAnimate?: (fromIndex: number, toIndex: number) => void;
  snapPoints?: (string | number)[] | ((props: any) => (string | number)[] | undefined);
}

export default function withBottomSheet<P extends object>(
  Component: React.ComponentType<P>,
  bottomSheetProps: WithBottomSheetProps = {}
) {
  const WrappedComponent = (props: P) => {
    const dispatch = useDispatch();
    const { height } = useWindowDimensions();
    const { onClose = () => {}, onAnimate = () => {}, snapPoints, ...restBottomSheetProps } = bottomSheetProps;
    
    // Resolve snapPoints if it's a function
    const resolvedSnapPoints = typeof snapPoints === 'function' ? snapPoints(props) : snapPoints;

    const handleAnimate = (fromIndex: number, toIndex: number) => {
      if (toIndex < fromIndex) {
        Keyboard.dismiss();
      }
      onAnimate?.(fromIndex, toIndex);
    };

    return (
      <BottomSheet
        accessible={false}
        index={0}
        enablePanDownToClose={true}
        enableOverDrag={false}
        maxDynamicContentSize={height * 0.9}
        enableDynamicSizing={!resolvedSnapPoints}
        snapPoints={resolvedSnapPoints}
        backdropComponent={BackdropComponent}
        keyboardBlurBehavior="restore"
        onAnimate={handleAnimate}
        onClose={() => {
          Keyboard.dismiss();
          dispatch(closeActive());
          onClose?.();
        }}
        {...restBottomSheetProps}>
        <Component {...props} />
      </BottomSheet>
    );
  };

  return WrappedComponent;
}

