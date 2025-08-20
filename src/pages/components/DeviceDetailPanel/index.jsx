import React from 'react';
import { Input, Table, Switch } from 'antd';

import styles from './index.module.less';

const DeviceDetailPanel = () => {
  return (
    <div className={styles.deviceDetailContainer}>
      <div className={styles.deviceHeader}>
        <div className={styles.deviceInfoSection}>
          <div className={styles.deviceInfoRow}>
            <div className={styles.deviceInfoRow}>
              <span className={styles.deviceLabel}>设备名称：</span>
              <div className={styles.deviceValueBox}>
                <span className={styles.deviceValue}>test4</span>
              </div>
            </div>
            <div className={styles.deviceInfoRow}>
              <span className={styles.deviceTab}>基本信息</span>
              <span className={styles.deviceTab}>属性</span>
              <span className={styles.deviceTab}>测点</span>
              <span className={styles.deviceTab}>数据查看</span>
              <span className={styles.deviceTab}>动作</span>
              <a className={styles.deviceTab}>报警规则</a>
              <span className={styles.deviceTab}>事件规则</span>
              <span className={styles.deviceTab}>设备连接&运行记录</span>
              <span className={styles.deviceTab}>形貌图</span>
              <span className={styles.deviceTab}>位置</span>
              <span className={styles.deviceTab}>日志</span>
              <span className={styles.deviceTab}>报警</span>
            </div>
          </div>
          <div className={styles.backSection}>
            <img
              alt=""
              src="https://mdn.alipayobjects.com/fecodex_image/afts/img/Quw2Sr9QdosAAAAAFJAAAAgAejH3AQBr/original"
              className={styles.backIcon}
            />
            <span className={styles.backText}>返回</span>
          </div>
        </div>
        <Input
          size="small"
          placeholder="增减速规则报警自定义规则报警"
          prefix={<a className={styles.basicRuleLink}>基本规则报警</a>}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.contentSection}>
        <div className={styles.tableContainer}>
          <Table
            columns={[
              {
                title: (
                  <div className={styles.tableHeaderRow}>
                    <div className={styles.thresholdRow}>
                      <span className={styles.pointNameHeader}>测点名称</span>
                    </div>
                    <div className={styles.thresholdRow}>
                      <span className={styles.thresholdLabel}>低阈值</span>
                      <span className={styles.thresholdLabel}>低低报</span>
                      <span className={styles.thresholdLabel}>低报</span>
                      <span className={styles.thresholdLabel}>低报自动解除</span>
                      <img
                        alt=""
                        src="https://mdn.alipayobjects.com/fecodex_image/afts/img/c6ziRroif10AAAAAHEAAAAgAejH3AQBr/original"
                        className={styles.thresholdSeparator}
                      />
                      <span className={styles.thresholdLabel}>高阈值</span>
                      <span className={styles.thresholdLabel}>高报</span>
                      <span className={styles.thresholdLabel}>高高报</span>
                      <span className={styles.thresholdLabel}>高报自动解除</span>
                      <img
                        alt=""
                        src="https://mdn.alipayobjects.com/fecodex_image/afts/img/v-fDT5Umk1AAAAAAG4AAAAgAejH3AQBr/original"
                        className={styles.thresholdSeparator}
                      />
                    </div>
                  </div>
                ),
                key: '1',
                render: () => (
                  <div className={styles.tableHeaderRow}>
                    <span className={styles.pointName}>电压</span>
                    <Switch
                      size="small"
                      checked
                      className={styles.alarmSwitch}
                    />
                    <span className={styles.lowThresholdValue}>2</span>
                    <div className={styles.lowThresholdActions}>
                      <Switch size="small" checked />
                      <span className={styles.lowThresholdInvertText}>取反</span>
                    </div>
                    <span className={styles.highThresholdValue}>请填写</span>
                    <Switch
                      size="small"
                      checked
                      className={styles.highThresholdSwitch}
                    />
                    <span className={styles.highHighThresholdValue}>请填写</span>
                    <div className={styles.highThresholdActions}>
                      <Switch size="small" checked={false} />
                      <span className={styles.highThresholdInvertText}>取反</span>
                    </div>
                  </div>
                ),
              },
            ]}
            dataSource={[0, 1, 2]}
            pagination={{ total: 30, size: 'small', position: 'bottomRight' }}
            rowSelection={<checkbox />}
            showHeader
            className={styles.alarmTable}
          />
          <img
            alt=""
            src="https://mdn.alipayobjects.com/fecodex_image/afts/img/9yp0SILnA34AAAAAQCAAAAgAejH3AQBr/original"
            className={styles.tableExpandIcon}
          />
        </div>
        <Input.TextArea
          placeholder=""
          rows={4}
          className={styles.remarksTextarea}
        />
      </div>
    </div>
  );
};

export default DeviceDetailPanel;
