package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pinyougou.mapper.TbBrandMapper;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.pojo.TbBrandExample;
import com.pinyougou.sellergoods.service.BrandService;
import entity.PageResult;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service
//@Transactional
public class BrandServiceImpl implements BrandService{

    @Autowired
    private TbBrandMapper tbBrandMapper;

    /**
     * 查询所有
     * @return
     */
    @Override
    public List<TbBrand> findAll() {
        return tbBrandMapper.selectByExample(null);
    }

    /**
     * 分页查询
     * @param page
     * @param size
     * @return
     */
    @Override
    public PageResult findPage(Integer page, Integer size) {
        PageHelper.startPage(page,size);
        Page<TbBrand> page1 = (Page<TbBrand>) tbBrandMapper.selectByExample(null);
        return new PageResult(page1.getTotal(),page1.getResult());
    }

    /**
     * 添加信息
     * @param tbBrand
     */
    @Override
    public void add(TbBrand tbBrand) {
        tbBrandMapper.insert(tbBrand);
    }


    /**
     * 根据id查询
     * @param id
     * @return
     */
    @Override
    public TbBrand findOne(Long id) {
        return tbBrandMapper.selectByPrimaryKey(id);
    }

    /**
     * 修改信息
     * @param tbBrand
     */
    @Override
    public void update(TbBrand tbBrand) {
        tbBrandMapper.updateByPrimaryKey(tbBrand);
    }

    /**
     * 删除
     * @param ids
     */
    @Override
    public void delete(Long[] ids) {
        for (Long id : ids) {
            tbBrandMapper.deleteByPrimaryKey(id);
        }
    }

    /**
     * 根据条件查询
     * @param tbBrand
     * @param page
     * @param size
     * @return
     */
    @Override
    public PageResult findByNameAdFirstChar(TbBrand tbBrand, Integer page, Integer size) {

        TbBrandExample example = new TbBrandExample();
        TbBrandExample.Criteria criteria = example.createCriteria();
        if (tbBrand!=null){
            if (tbBrand.getName() != null && tbBrand.getName().length()>0){
                criteria.andNameLike("%"+tbBrand.getName()+"%");
            }
            if (tbBrand.getFirstChar() != null && tbBrand.getFirstChar().length()>0){
                criteria.andFirstCharLike("%"+tbBrand.getFirstChar()+"%");
            }
        }
        PageHelper.startPage(page,size);
        Page<TbBrand> page1 = (Page<TbBrand>) tbBrandMapper.selectByExample(example);
        return new PageResult(page1.getTotal(),page1.getResult());
    }

    @Override
    public List<Map> findOptionList() {
        return tbBrandMapper.findOptionList();
    }

}
