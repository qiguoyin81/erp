import React, { useState, useMemo } from 'react';
import {
    SearchOutlined,
    DownOutlined,
    UpOutlined,
    CloseOutlined,
    StarOutlined,
    PlusOutlined,
    FilterOutlined,
    FolderOpenOutlined,
    AppstoreOutlined,
    TagOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    EditOutlined,
    CheckOutlined,
    CloseCircleOutlined,
    FileDoneOutlined,
    StopOutlined,
    ShoppingCartOutlined,
    DatabaseOutlined,
    TeamOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import {
    Input,
    Tag,
    Checkbox,
    Radio,
    Dropdown,
    Button,
    Space,
    Divider,
    Card,
    Badge
} from 'antd';


const SearchFilterAndGroup = () => {
    // 筛选状态
    const [filters, setFilters] = useState({
        status: ['todo'],
        tags: ['starred'],
        other: ['confirmed', 'scheduled']
    });

    // 分组状态
    const [grouping, setGrouping] = useState('date');

    // 收藏夹状态
    const [savedSearches, setSavedSearches] = useState([
        { id: 1, name: '我的待办任务', filters: { status: ['todo'], tags: [], other: [] }, grouping: 'status' },
        { id: 2, name: '本周任务', filters: { status: ['todo', 'inProgress'], tags: ['starred'], other: [] }, grouping: 'date' }
    ]);

    const [newSearchName, setNewSearchName] = useState('');

    // 控制下拉显示状态
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // 状态选项
    const statusOptions = [
        { label: '待办', value: 'todo', icon: <ClockCircleOutlined /> },
        { label: '已分解', value: 'decomposed', icon: <FileDoneOutlined /> },
        { label: '已完成', value: 'completed', icon: <CheckCircleOutlined /> },
        { label: '已取消', value: 'cancelled', icon: <CloseCircleOutlined /> }
    ];

    // 标签选项
    const tagOptions = [
        { label: '标星', value: 'starred', icon: <StarOutlined /> },
        { label: '此工作站', value: 'workstation', icon: <UserOutlined /> },
        { label: '草稿', value: 'draft', icon: <EditOutlined /> }
    ];

    // 其他选项
    const otherOptions = [
        { label: '已确认', value: 'confirmed', icon: <CheckOutlined /> },
        { label: '已安排', value: 'scheduled', icon: <ScheduleOutlined /> },
        { label: '进行中', value: 'inProgress', icon: <ClockCircleOutlined /> },
        { label: '待关闭', value: 'pendingClose', icon: <CloseOutlined /> },
        { label: '制造订单等待中', value: 'moWaiting', icon: <ShoppingCartOutlined /> },
        { label: 'MO 准备就绪', value: 'moReady', icon: <CheckOutlined /> }
    ];

    // 分组选项
    const groupingOptions = [
        { label: '产品', value: 'product', icon: <DatabaseOutlined /> },
        { label: '状态', value: 'status', icon: <ExclamationCircleOutlined /> },
        { label: '物料可用性', value: 'materialAvailability', icon: <ShoppingCartOutlined /> },
        { label: '采购组', value: 'procurementGroup', icon: <TeamOutlined /> },
        { label: '日期', value: 'date', icon: <CalendarOutlined /> },
        { label: '添加自定义分组', value: 'custom', icon: <PlusOutlined /> }
    ];

    // 计算已选择的筛选条件数量
    const selectedFilterCount = useMemo(() => {
        return Object.values(filters).reduce((total, category) => total + category.length, 0);
    }, [filters]);

    // 处理筛选条件变化
    const handleFilterChange = (category, value) => {
        setFilters(prev => {
            const categoryFilters = prev[category] || [];
            let newFilters;

            if (categoryFilters.includes(value)) {
                newFilters = categoryFilters.filter(item => item !== value);
            } else {
                newFilters = [...categoryFilters, value];
            }

            return {
                ...prev,
                [category]: newFilters
            };
        });
    };

    // 处理分组变化
    const handleGroupingChange = (e) => {
        setGrouping(e.target.value);
    };

    // 保存当前搜索
    const handleSaveSearch = () => {
        if (newSearchName.trim()) {
            const newSearch = {
                id: Date.now(),
                name: newSearchName.trim(),
                filters: { ...filters },
                grouping
            };
            setSavedSearches([...savedSearches, newSearch]);
            setNewSearchName('');
        }
    };

    // 应用收藏的搜索
    const applySavedSearch = (savedSearch) => {
        setFilters({ ...savedSearch.filters });
        setGrouping(savedSearch.grouping);
        setDropdownVisible(false);
    };

    // 移除筛选条件
    const removeFilter = (category, value) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item !== value)
        }));
    };

    // 获取筛选条件的标签
    const getFilterTags = () => {
        const tags = [];

        // 状态标签
        filters.status.forEach(value => {
            const option = statusOptions.find(opt => opt.value === value);
            if (option) {
                tags.push({
                    key: `status-${value}`,
                    category: 'status',
                    value,
                    label: option.label,
                    color: 'blue',
                    icon: option.icon
                });
            }
        });

        // 标签
        filters.tags.forEach(value => {
            const option = tagOptions.find(opt => opt.value === value);
            if (option) {
                tags.push({
                    key: `tags-${value}`,
                    category: 'tags',
                    value,
                    label: option.label,
                    color: 'gold',
                    icon: option.icon
                });
            }
        });

        // 其他选项
        filters.other.forEach(value => {
            const option = otherOptions.find(opt => opt.value === value);
            if (option) {
                tags.push({
                    key: `other-${value}`,
                    category: 'other',
                    value,
                    label: option.label,
                    color: 'purple',
                    icon: option.icon
                });
            }
        });

        return tags;
    };

    // 获取分组标签
    const getGroupingTag = () => {
        const option = groupingOptions.find(opt => opt.value === grouping);
        return option ? { label: option.label, icon: option.icon } : null;
    };

    // 收藏夹下拉菜单
    const renderFavoritesMenu = () => (
        <div style={{
            padding: '12px',
            width: '240px',
            backgroundColor: '#fff',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            border: '1px solid #d9d9d9'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <FolderOpenOutlined style={{
                    fontSize: '16px',
                    color: '#1890ff',
                    marginRight: '8px'
                }} />
                <span style={{
                    fontWeight: '600',
                    fontSize: '14px'
                }}>
                    收藏夹
                </span>
            </div>
            <div style={{ marginBottom: '12px' }}>
                <Input
                    placeholder="搜索名称"
                    value={newSearchName}
                    onChange={(e) => setNewSearchName(e.target.value)}
                    onPressEnter={handleSaveSearch}
                    size="small"
                    prefix={<EditOutlined style={{ 
                        fontSize: '12px',
                        color: '#bfbfbf'
                    }} />}
                    style={{
                        borderRadius: '4px'
                    }}
                />
            </div>
            <Button
                type="primary"
                icon={<PlusOutlined style={{ fontSize: '12px' }} />}
                onClick={handleSaveSearch}
                style={{ 
                    width: '100%',
                    borderRadius: '4px',
                    fontSize: '13px',
                    height: '32px'
                }}
                disabled={!newSearchName.trim()}
            >
                保存当前搜索
            </Button>
        </div>
    );

    // 主要下拉内容
    const renderDropdownContent = () => (
        <div style={{ 
            width: '650px',
            maxHeight: '420px',
            overflow: 'hidden',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '16px'
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                {/* 筛选条件 */}
                <div style={{ flex: 1 }}>
                    <div style={{ 
                        fontWeight: '600', 
                        marginBottom: '12px', 
                        fontSize: '15px',
                        padding: '6px 0',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <Space size={8}>
                            <FilterOutlined style={{ color: '#1890ff' }} />
                            <span>筛选条件</span>
                        </Space>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ 
                                fontWeight: '500', 
                                marginBottom: '8px', 
                                fontSize: '13px',
                                color: '#595959'
                            }}>
                                状态
                            </div>
                            <div>
                                {statusOptions.map(option => (
                                    <Checkbox
                                        key={option.value}
                                        checked={filters.status.includes(option.value)}
                                        onChange={() => handleFilterChange('status', option.value)}
                                        style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '5px 0', 
                                            width: '100%',
                                            padding: '4px 8px',
                                            borderRadius: '4px'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <Space size={8}>
                                            {React.cloneElement(option.icon, { 
                                                style: { 
                                                    fontSize: '14px',
                                                    color: filters.status.includes(option.value) ? '#1890ff' : 'inherit'
                                                } 
                                            })}
                                            <span style={{
                                                fontSize: '14px',
                                                color: filters.status.includes(option.value) ? '#1890ff' : 'inherit',
                                                fontWeight: filters.status.includes(option.value) ? '500' : 'normal'
                                            }}>
                                                {option.label}
                                            </span>
                                        </Space>
                                    </Checkbox>
                                ))}
                            </div>
                        </div>

                        <div style={{ 
                            marginBottom: '16px',
                            paddingBottom: '16px',
                            borderBottom: '1px solid #f0f0f0'  // 添加底部边框作为分割线
                        }}>
                            <div style={{ 
                                fontWeight: '500', 
                                marginBottom: '8px', 
                                fontSize: '13px',
                                color: '#595959'
                            }}>
                                标签
                            </div>
                            <div>
                                {tagOptions.map(option => (
                                    <Checkbox
                                        key={option.value}
                                        checked={filters.tags.includes(option.value)}
                                        onChange={() => handleFilterChange('tags', option.value)}
                                        style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '5px 0', 
                                            width: '100%',
                                            padding: '4px 8px',
                                            borderRadius: '4px'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <Space size={8}>
                                            {React.cloneElement(option.icon, { 
                                                style: { 
                                                    fontSize: '14px',
                                                    color: filters.tags.includes(option.value) ? '#1890ff' : 'inherit'
                                                } 
                                            })}
                                            <span style={{
                                                fontSize: '14px',
                                                color: filters.tags.includes(option.value) ? '#1890ff' : 'inherit',
                                                fontWeight: filters.tags.includes(option.value) ? '500' : 'normal'
                                            }}>
                                                {option.label}
                                            </span>
                                        </Space>
                                    </Checkbox>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ 
                                fontWeight: '500', 
                                marginBottom: '8px', 
                                fontSize: '13px',
                                color: '#595959'
                            }}>
                                其他
                            </div>
                            <div>
                                {otherOptions.map(option => (
                                    <Checkbox
                                        key={option.value}
                                        checked={filters.other.includes(option.value)}
                                        onChange={() => handleFilterChange('other', option.value)}
                                        style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '5px 0', 
                                            width: '100%',
                                            padding: '4px 8px',
                                            borderRadius: '4px'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <Space size={8}>
                                            {React.cloneElement(option.icon, { 
                                                style: { 
                                                    fontSize: '14px',
                                                    color: filters.other.includes(option.value) ? '#1890ff' : 'inherit'
                                                } 
                                            })}
                                            <span style={{
                                                fontSize: '14px',
                                                color: filters.other.includes(option.value) ? '#1890ff' : 'inherit',
                                                fontWeight: filters.other.includes(option.value) ? '500' : 'normal'
                                            }}>
                                                {option.label}
                                            </span>
                                        </Space>
                                    </Checkbox>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 分组方式 */}
                <div style={{ flex: 1 }}>
                    <div style={{ 
                        fontWeight: '600', 
                        marginBottom: '12px', 
                        fontSize: '15px',
                        padding: '6px 0',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <Space size={8}>
                            <AppstoreOutlined style={{ color: '#1890ff' }} />
                            <span>分组方式</span>
                        </Space>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {groupingOptions.map(option => (
                            <Radio 
                                key={option.value} 
                                value={option.value} 
                                checked={grouping === option.value}
                                onChange={() => setGrouping(option.value)}
                                style={{ 
                                    display: 'block', 
                                    margin: '5px 0', 
                                    width: '100%',
                                    padding: '6px 8px',
                                    borderRadius: '4px'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <Space size={8}>
                                    {React.cloneElement(option.icon, { 
                                        style: { 
                                            fontSize: '14px',
                                            color: grouping === option.value ? '#1890ff' : 'inherit'
                                        } 
                                    })}
                                    <span style={{
                                        fontSize: '14px',
                                        color: grouping === option.value ? '#1890ff' : 'inherit',
                                        fontWeight: grouping === option.value ? '500' : 'normal'
                                    }}>
                                        {option.label}
                                    </span>
                                </Space>
                            </Radio>
                        ))}
                    </div>
                </div>

                {/* 收藏夹 */}
                <div style={{ flex: 1 }}>
                    <div style={{ 
                        fontWeight: '600', 
                        marginBottom: '12px', 
                        fontSize: '15px',
                        padding: '6px 0',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <Space size={8}>
                            <FolderOpenOutlined style={{ color: '#1890ff' }} />
                            <span>收藏夹</span>
                        </Space>
                    </div>
                    <div>
                        <Dropdown
                            dropdownRender={renderFavoritesMenu}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <Button 
                                size="small" 
                                style={{ 
                                    marginBottom: '12px',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    height: 'auto'
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
                            >
                                <Space size={6}>
                                    <PlusOutlined style={{ fontSize: '12px' }} />
                                    <span style={{ fontSize: '13px' }}>保存当前搜索</span>
                                </Space>
                            </Button>
                        </Dropdown>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {savedSearches.map(search => (
                                <div
                                    key={search.id}
                                    onClick={() => applySavedSearch(search)}
                                    style={{
                                        padding: '6px 8px',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        margin: '3px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <Space size={6}>
                                        <FolderOpenOutlined style={{ 
                                            fontSize: '14px',
                                            color: '#1890ff'
                                        }} />
                                        <span style={{
                                            fontSize: '13px'
                                        }}>
                                            {search.name}
                                        </span>
                                    </Space>
                                    <Button 
                                        type="text" 
                                        icon={<CloseOutlined style={{ 
                                            fontSize: '10px',
                                            color: '#bfbfbf'
                                        }} />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSavedSearches(savedSearches.filter(s => s.id !== search.id));
                                        }}
                                        size="small"
                                        style={{
                                            width: '20px',
                                            height: '20px'
                                        }}
                                    />
                                </div>
                            ))}
                            {savedSearches.length === 0 && (
                                <div style={{
                                    padding: '12px',
                                    textAlign: 'center',
                                    color: '#bfbfbf',
                                    fontSize: '13px'
                                }}>
                                    暂无保存的搜索
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const filterTags = getFilterTags();
    const groupingTag = getGroupingTag();

    return (
        <div className="search-filter-group-container" style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '6px', 
            padding: '0', 
            backgroundColor: '#fff',
            marginBottom: '16px',
            minHeight: '36px',
            width: '100%',
            minWidth: '300px',
            maxWidth: '100%',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            // 添加选中效果
            ...(dropdownVisible && {
                borderColor: '#40a9ff',
                boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)'
            }),
            display: 'flex',
            alignItems: 'stretch',
            direction: 'rtl'
        }}>
            <div className="search-component" style={{ 
                display: 'flex', 
                alignItems: 'stretch',
                minHeight: '36px',
                width: '100%',
                direction: 'ltr'
            }}>
                {/* 搜索图标 */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '36px',
                    width: '36px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px 0 0 6px'
                }}>
                    <SearchOutlined className="search-icon" style={{ 
                        color: '#bfbfbf',
                        fontSize: '16px'
                    }} />
                </div>
                
                {/* 搜索输入框 */}
                <div className="search-input-wrapper" style={{ 
                    display: 'flex', 
                    alignItems: 'stretch',
                    minHeight: '36px',
                    flex: 1
                }}>
                    <div
                        className="search-tags"
                        style={{ 
                            flex: 1, 
                            minHeight: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'nowrap',
                            padding: '2px 8px',
                            overflow: 'auto'
                        }}
                    >
                        {filterTags.map(tag => (
                            <Tag
                                key={tag.key}
                                color={tag.color}
                                closable
                                onClose={(e) => {
                                    e.stopPropagation();
                                    removeFilter(tag.category, tag.value);
                                }}
                                closeIcon={<CloseOutlined style={{ 
                                    fontSize: '10px',
                                    color: 'rgba(0, 0, 0, 0.45)'
                                    }} />}
                                className="filter-tag"
                                style={{ 
                                    margin: '2px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    height: '20px',
                                    lineHeight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <Space size={2}>
                                    {tag.icon && React.cloneElement(tag.icon, { 
                                        style: { 
                                            fontSize: '12px' 
                                        } 
                                    })}
                                    <span>{tag.label}</span>
                                </Space>
                            </Tag>
                        ))}
                        {groupingTag && (
                            <Tag
                                color="orange"
                                closable
                                onClose={(e) => {
                                    e.stopPropagation();
                                    setGrouping('');
                                }}
                                closeIcon={<CloseOutlined style={{ 
                                    fontSize: '10px',
                                    color: 'rgba(0, 0, 0, 0.45)'
                                }} />}
                                className="grouping-tag"
                                style={{ 
                                    margin: '2px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    height: '20px',
                                    lineHeight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <Space size={2}>
                                    {groupingTag.icon && React.cloneElement(groupingTag.icon, { 
                                        style: { 
                                            fontSize: '12px' 
                                        } 
                                    })}
                                    <span>分组: {groupingTag.label}</span>
                                </Space>
                            </Tag>
                        )}
                        {selectedFilterCount === 0 && !groupingTag && (
                            <span className="placeholder-text" style={{ 
                                color: '#bfbfbf',
                                fontSize: '14px',
                                whiteSpace: 'nowrap'
                            }}>
                                搜索...
                            </span>
                        )}
                    </div>
                </div>
                
                {/* 下拉按钮与输入框合并到同一个div中 */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    minHeight: '36px',
                    width: '32px'
                }}>
                    <Dropdown
                        dropdownRender={renderDropdownContent}
                        trigger={['click']}
                        open={dropdownVisible}
                        onOpenChange={setDropdownVisible}
                        placement="bottomRight"
                    >
                        <Button
                            className="dropdown-button"
                            icon={dropdownVisible ? 
                                <UpOutlined style={{ fontSize: '12px' }} /> : 
                                <DownOutlined style={{ fontSize: '12px' }} />
                            }
                            size="small"
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}
                        />
                    </Dropdown>
                    {selectedFilterCount > 0 && (
                        <Badge 
                            count={selectedFilterCount} 
                            className="filter-count-badge" 
                            size="small" 
                            style={{ 
                                margin: '0 0 0 4px',
                                backgroundColor: '#1890ff',
                                alignSelf: 'center'
                            }} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilterAndGroup;
