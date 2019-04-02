package com.pinyougou.sellergoods.service;

import java.util.List;

import com.pinyougou.pojo.TbBrand;
import entity.PageResult;

/**
 * 品牌接口
 * @author Administrator
 *
 */
public interface BrandService {

	List<TbBrand> findAll();

	PageResult findPage(Integer page, Integer size);

	void add(TbBrand tbBrand);

	TbBrand findOne(Long id);

	void update(TbBrand tbBrand);

	void delete(Long[] ids);

	PageResult findByNameAdFirstChar(TbBrand tbBrand,Integer page, Integer size);


}
