import React, { useState } from 'react';
import { 
  Switch, 
  Input, 
  Table, 
  Tabs, 
  Space,
  Typography,
  Card,
  Checkbox
} from 'antd';
import { 
  HomeOutlined, 
  SearchOutlined
} from '@ant-design/icons';
import './App.less';

const { Title, Text } = Typography;

const ThresholdEventRuleDetailPanel = () => {
  const [activeTab, setActiveTab] = useState('1');
  
  // 报警规则数据
  const [data, setData] = useState([
    {
      key: '1',
      checked: true,
      attributeName: '电压',
      duration: '5',
      lowLow: { enabled: true, value: '220' },
      low: { enabled: true, value: '230' },
      lowAutoRelease: { enabled: false },
      high: { enabled: true, value: '250' },
      highHigh: { enabled: true, value: '260' },
      highAutoRelease: { enabled: false }
    },
    {
      key: '2',
      checked: false,
      attributeName: 'vv',
      duration: '10',
      lowLow: { enabled: false, value: '' },
      low: { enabled: true, value: '100' },
      lowAutoRelease: { enabled: true },
      high: { enabled: false, value: '' },
      highHigh: { enabled: true, value: '200' },
      highAutoRelease: { enabled: true }
    },
    {
      key: '3',
      checked: true,
      attributeName: 'vv偏度指标',
      duration: '3',
      lowLow: { enabled: true, value: '0.5' },
      low: { enabled: false, value: '' },
      lowAutoRelease: { enabled: false },
      high: { enabled: true, value: '1.5' },
      highHigh: { enabled: false, value: '' },
      highAutoRelease: { enabled: true }
    }
  ]);

  // 更新报警规则数据
  const updateAlarmData = (key, field, subField, value) => {
    setData(prevData => 
      prevData.map(item => 
        item.key === key 
          ? { ...item, [field]: { ...item[field], [subField]: value } } 
          : item
      )
    );
  };

  // 处理数字输入
  const handleNumberInput = (key, field, subField, value) => {
    // 只允许数字和小数点
    const numericValue = value.replace(/[^0-9.]/g, '');
    // 确保只有一个小数点
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }
    updateAlarmData(key, field, subField, numericValue);
  };

  // 处理持续时长输入
  const handleDurationInput = (key, value) => {
    // 只允许数字
    const numericValue = value.replace(/[^0-9]/g, '');
    setData(prevData => 
      prevData.map(item => 
        item.key === key 
          ? { ...item, duration: numericValue } 
          : item
      )
    );
  };

  // 处理复选框变化
  const handleCheckChange = (key, checked) => {
    setData(prevData => 
      prevData.map(item => {
        if (item.key === key) {
          // 如果主复选框被取消选中，清空所有报警值
          if (!checked) {
            return {
              ...item,
              checked,
              lowLow: { ...item.lowLow, value: '' },
              low: { ...item.low, value: '' },
              high: { ...item.high, value: '' },
              highHigh: { ...item.highHigh, value: '' }
            };
          }
          return { ...item, checked };
        }
        return item;
      })
    );
  };

  // 处理报警开关变化
  const handleAlarmSwitchChange = (key, field, checked) => {
    if (checked) {
      // 开启时保留原有值或设置默认值
      updateAlarmData(key, field, 'enabled', true);
    } else {
      // 关闭时清空值
      updateAlarmData(key, field, 'enabled', false);
      updateAlarmData(key, field, 'value', '');
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '',
      dataIndex: 'checked',
      key: 'checked',
      width: 40,
      fixed: 'left',
      render: (_, record) => (
        <Checkbox 
          checked={record.checked}
          onChange={e => handleCheckChange(record.key, e.target.checked)}
        />
      )
    },
    {
      title: '属性名称',
      dataIndex: 'attributeName',
      key: 'attributeName',
      width: 120,
      fixed: 'left'
    },
    {
      title: '持续时长(s)',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      fixed: 'left',
      render: (_, record) => (
        <Input 
          value={record.duration}
          onChange={e => handleDurationInput(record.key, e.target.value)}
          placeholder="请填写"
          style={{ width: 80 }}
          disabled={!record.checked}
        />
      )
    },
    {
      title: '低阈值',
      children: [
        {
          title: '低低报',
          dataIndex: 'lowLow',
          key: 'lowLow',
          width: 150,
          render: (_, record) => (
            <Space>
              <Switch 
                checked={record.lowLow.enabled}
                onChange={checked => handleAlarmSwitchChange(record.key, 'lowLow', checked)}
                checkedChildren="开"
                unCheckedChildren="关"
                disabled={!record.checked}
              />
              {record.lowLow.enabled && (
                record.checked ? (
                  <Input 
                    value={record.lowLow.value}
                    onChange={e => handleNumberInput(record.key, 'lowLow', 'value', e.target.value)}
                    placeholder="请填写"
                    style={{ width: 80 }}
                  />
                ) : (
                  <Text>{record.lowLow.value}</Text>
                )
              )}
            </Space>
          )
        },
        {
          title: '低报',
          dataIndex: 'low',
          key: 'low',
          width: 150,
          render: (_, record) => (
            <Space>
              <Switch 
                checked={record.low.enabled}
                onChange={checked => handleAlarmSwitchChange(record.key, 'low', checked)}
                checkedChildren="开"
                unCheckedChildren="关"
                disabled={!record.checked}
              />
              {record.low.enabled && (
                record.checked ? (
                  <Input 
                    value={record.low.value}
                    onChange={e => handleNumberInput(record.key, 'low', 'value', e.target.value)}
                    placeholder="请填写"
                    style={{ width: 80 }}
                  />
                ) : (
                  <Text>{record.low.value}</Text>
                )
              )}
            </Space>
          )
        },
        {
          title: '低报自动解除',
          dataIndex: 'lowAutoRelease',
          key: 'lowAutoRelease',
          width: 120,
          render: (_, record) => (
            <Space>
              <Switch 
                checked={record.lowAutoRelease.enabled}
                onChange={checked => handleAlarmSwitchChange(record.key, 'lowAutoRelease', checked)}
                checkedChildren="开"
                unCheckedChildren="关"
                disabled={!record.checked}
              />
            </Space>
          )
        }
      ]
    },
    {
      title: '高阈值',
      children: [
        {
          title: '高报',
          dataIndex: 'high',
          key: 'high',
          width: 150,
          render: (_, record) => (
            <Space>
              <Switch 
                checked={record.high.enabled}
                onChange={checked => handleAlarmSwitchChange(record.key, 'high', checked)}
                checkedChildren="开"
                unCheckedChildren="关"
                disabled={!record.checked}
              />
              {record.high.enabled && (
                record.checked ? (
                  <Input 
                    value={record.high.value}
                    onChange={e => handleNumberInput(record.key, 'high', 'value', e.target.value)}
                    placeholder="请填写"
                    style={{ width: 80 }}
                  />
                ) : (
                  <Text>{record.high.value}</Text>
                )
              )}
            </Space>
          )
        },
        {
          title: '高高报',
          dataIndex: 'highHigh',
          key: 'highHigh',
          width: 150,
          render: (_, record) => (
            <Space>
              <Switch 
                checked={record.highHigh.enabled}
                onChange={checked => handleAlarmSwitchChange(record.key, 'highHigh', checked)}
                checkedChildren="开"
                unCheckedChildren="关"
                disabled={!record.checked}
              />
              {record.highHigh.enabled && (
                record.checked ? (
                  <Input 
                    value={record.highHigh.value}
                    onChange={e => handleNumberInput(record.key, 'highHigh', 'value', e.target.value)}
                    placeholder="请填写"
                    style={{ width: 80 }}
                  />
                ) : (
                  <Text>{record.highHigh.value}</Text>
                )
              )}
            </Space>
          )
        },
        {
          title: '高报自动解除',
          dataIndex: 'highAutoRelease',
          key: 'highAutoRelease',
          width: 120,
          render: (_, record) => (
            <Space>
              <Switch 
                checked={record.highAutoRelease.enabled}
                onChange={checked => handleAlarmSwitchChange(record.key, 'highAutoRelease', checked)}
                checkedChildren="开"
                unCheckedChildren="关"
                disabled={!record.checked}
              />
            </Space>
          )
        }
      ]
    }
  ];

  // 导航标签
  const navItems = [
    { key: 'basic', label: '基本信息' },
    { key: 'properties', label: '属性' },
    { key: 'points', label: '测点' },
    { key: 'data', label: '数据查看' },
    { key: 'actions', label: '动作' },
    { key: 'alarm-rules', label: '报警规则' },
    { key: 'event-rules', label: '事件规则' },
    { key: 'records', label: '设备连接&运行记录' },
    { key: 'diagram', label: '形貌图' },
    { key: 'location', label: '位置' },
    { key: 'logs', label: '日志' },
    { key: 'alarms', label: '报警' }
  ];

  // 报警规则标签
  const alarmRuleTabs = [
    { key: '1', label: '基本规则报警' },
    { key: '2', label: '增减速规则报警' },
    { key: '3', label: '自定义规则报警' }
  ];

  return (
    <div className="threshold-event-rule-detail-panel">
      {/* 顶部导航 */}
      <div className="header">
        <div className="device-info">
          <HomeOutlined className="home-icon" />
          <Title level={4} className="device-name">test4</Title>
        </div>
        <div className="nav-tabs">
          <Space size="middle">
            {navItems.map(item => (
              <Text 
                className={`nav-item ${item.key === 'alarm-rules' ? 'active' : ''}`} 
                key={item.key}
              >
                {item.label}
              </Text>
            ))}
          </Space>
        </div>
      </div>

      {/* 报警规则标签 */}
      <div className="alarm-rule-tabs">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={alarmRuleTabs}
        />
      </div>

      {/* 表格内容 */}
      <Card className="table-container">
        <Table 
          dataSource={data}
          columns={columns}
          pagination={{
            total: 3,
            current: 1,
            pageSize: 10,
            showTotal: (total) => `共${total}条记录 第1/1页 10条/页`,
            size: 'small'
          }}
          scroll={{ x: 1200 }}
          size="middle"
          className="alarm-rule-table"
        />
      </Card>
    </div>
  );
};

export default ThresholdEventRuleDetailPanel;
