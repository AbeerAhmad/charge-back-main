import SelectionBottomSheet from '@/components/bottom-sheets/selection-bottom-sheet';
import { BOTTOM_SHEETS } from '@/constants';
import { closeActive } from '@/redux/slices/layer-slice';
import React, { memo, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const getLayerComponent = (id: string) => {
  switch (id) {
    case BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION:
      return SelectionBottomSheet;
    default:
      return null;
  }
};

const getWrappedLayerComponent = (id: string) => {
  const LayerComponent = getLayerComponent(id);
  if (!LayerComponent) return null;

  if (BOTTOM_SHEETS[id as keyof typeof BOTTOM_SHEETS]) {
    const GesturedLayerComponent = (props: any) => (
      <GestureHandlerRootView
        style={{
          ...StyleSheet.absoluteFillObject,
          flex: 1,
          zIndex: 100,
        }}
      >
        <LayerComponent {...props} />
      </GestureHandlerRootView>
    );
    return GesturedLayerComponent;
  }

  return LayerComponent;
};

const LayerManager = () => {
  const dispatch = useDispatch();
  const activeLayer = useSelector((state: any) => state.layer.activeLayers?.[0]);

  useEffect(() => {
    if (!activeLayer) return;

    const isBottomSheet = BOTTOM_SHEETS[activeLayer.id as keyof typeof BOTTOM_SHEETS];
    if (!isBottomSheet) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      dispatch(closeActive());
      return true;
    });

    return () => backHandler.remove();
  }, [activeLayer, dispatch]);

  if (!activeLayer) {
    return null;
  }

  const LayerComponent = getWrappedLayerComponent(activeLayer.id);
  if (!LayerComponent) return null;

  return <LayerComponent key={Math.random()} data={activeLayer.data} />;
};

export default memo(LayerManager);

